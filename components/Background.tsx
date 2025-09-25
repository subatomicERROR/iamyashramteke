
import React, { useRef, useEffect, useMemo } from 'react';

// A high-performance, WebGL-based fluid simulation component.
// This is a self-contained implementation adapted for React from open-source WebGL fluid experiments.

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Using useMemo to prevent re-creation on re-renders, though this component renders once.
    const config = useMemo(() => ({
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SUPPORT_FLOAT_TEXTURE: false,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 10, g: 10, b: 15 },
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
    }), []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { gl, ext } = getWebGLContext(canvas);
        if (!gl) {
             console.error("WebGL is not supported.");
             return;
        }

        config.SUPPORT_FLOAT_TEXTURE = ext.supportLinearFiltering;

        // All simulation state and programs are encapsulated here.
        const fluidSimulation = new FluidSimulation(gl, ext, config);

        // Add initial random splats to make it visually interesting from the start.
        fluidSimulation.addInitialSplat();

        let lastTime = Date.now();
        const pointers = [new Pointer()];
        
        const update = () => {
            const now = Date.now();
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            if (!config.PAUSED) {
                fluidSimulation.step(dt, pointers);
                fluidSimulation.render();
            }
            requestAnimationFrame(update);
        };
        
        update();

        const handleMouseMove = (e: MouseEvent) => {
            pointers[0].moved = pointers[0].down;
            pointers[0].dx = (e.clientX - pointers[0].x) * 5;
            pointers[0].dy = (e.clientY - pointers[0].y) * 5;
            pointers[0].x = e.clientX;
            pointers[0].y = e.clientY;
        };

        const handleMouseDown = () => {
            pointers[0].down = true;
            fluidSimulation.splat(pointers[0]);
        };

        const handleMouseUp = () => {
            pointers[0].down = false;
        };
        
        const handleTouchStart = (e: TouchEvent) => {
            for (let i = 0; i < e.targetTouches.length; i++) {
                const touch = e.targetTouches[i];
                if (pointers[i] == null) {
                    pointers[i] = new Pointer();
                }
                pointers[i].id = touch.identifier;
                pointers[i].down = true;
                pointers[i].x = touch.clientX;
                pointers[i].y = touch.clientY;
                pointers[i].dx = 0;
                pointers[i].dy = 0;
                fluidSimulation.splat(pointers[i]);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
             for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                const pointer = pointers.find(p => p.id === touch.identifier);
                if (pointer == null) continue;
                pointer.moved = pointer.down;
                pointer.dx = (touch.clientX - pointer.x) * 10;
                pointer.dy = (touch.clientY - pointer.y) * 10;
                pointer.x = touch.clientX;
                pointer.y = touch.clientY;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                const pointer = pointers.find(p => p.id === touch.identifier);
                if (pointer == null) continue;
                pointer.down = false;
            }
        };


        const handleResize = () => {
            fluidSimulation.resize();
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);


        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [config]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" style={{ background: `rgb(${config.BACK_COLOR.r}, ${config.BACK_COLOR.g}, ${config.BACK_COLOR.b})` }} />;
};


// --- WebGL and Fluid Simulation Logic --- //

// Utility to get WebGL context and check for required extensions.
function getWebGLContext(canvas: HTMLCanvasElement) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
    const isWebGL2 = !!gl;
    if (!isWebGL2) {
        gl = canvas.getContext('webgl', params) as WebGLRenderingContext | null;
    }

    if (gl) {
        let halfFloat: any;
        if (isWebGL2) {
            (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
            halfFloat = (gl as WebGL2RenderingContext).HALF_FLOAT;
        } else {
            halfFloat = (gl as WebGLRenderingContext).getExtension('OES_texture_half_float')?.HALF_FLOAT_OES;
            (gl as WebGLRenderingContext).getExtension('OES_texture_half_float_linear');
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }
    
    return { gl, ext: { supportLinearFiltering: true } };
}


class Pointer {
    id = -1;
    x = 0;
    y = 0;
    dx = 0;
    dy = 0;
    down = false;
    moved = false;
    color = [30, 0, 300];
}


class FluidSimulation {
    private gl: WebGLRenderingContext | WebGL2RenderingContext;
    private ext: any;
    private config: any;
    private dye: any;
    private velocity: any;
    private divergence: any;
    private curl: any;
    private pressure: any;
    private bloom: any;
    private bloomFramebuffers: any;
    private sunrays: any;
    private sunraysTemp: any;
    
    private programs: Record<string, any> = {};
    private quadBuffer: WebGLBuffer | null;

    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, ext: any, config: any) {
        this.gl = gl;
        this.ext = ext;
        this.config = config;

        this.quadBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quadBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.initPrograms();
        this.initFBOs();
        this.resize();
    }
    
    private createProgram(vertexShader: string, fragmentShader: string) {
        const gl = this.gl;
        const program = gl.createProgram();
        if (!program) throw new Error("Could not create program");

        const vs = this.compileShader(gl.VERTEX_SHADER, vertexShader);
        const fs = this.compileShader(gl.FRAGMENT_SHADER, fragmentShader);

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
        }

        const uniforms: Record<string, WebGLUniformLocation> = {};
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniform = gl.getActiveUniform(program, i);
            if(uniform){
                uniforms[uniform.name] = gl.getUniformLocation(program, uniform.name)!;
            }
        }
        
        return { program, uniforms };
    }
    
    private compileShader(type: number, source: string) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        if (!shader) throw new Error("Could not create shader");

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    private initPrograms() {
        const gl = this.gl as WebGL2RenderingContext;
        // Simplified shader sources for brevity
        const baseVertexShader = GLSL_SHADERS.baseVertex;
        this.programs.clear = this.createProgram(baseVertexShader, GLSL_SHADERS.clear);
        this.programs.display = this.createProgram(baseVertexShader, GLSL_SHADERS.display);
        this.programs.splat = this.createProgram(baseVertexShader, GLSL_SHADERS.splat);
        this.programs.advection = this.createProgram(baseVertexShader, GLSL_SHADERS.advection);
        this.programs.divergence = this.createProgram(baseVertexShader, GLSL_SHADERS.divergence);
        this.programs.curl = this.createProgram(baseVertexShader, GLSL_SHADERS.curl);
        this.programs.vorticity = this.createProgram(baseVertexShader, GLSL_SHADERS.vorticity);
        this.programs.pressure = this.createProgram(baseVertexShader, GLSL_SHADERS.pressure);
        this.programs.gradientSubtract = this.createProgram(baseVertexShader, GLSL_SHADERS.gradientSubtract);
        // Post-processing
        if (this.config.BLOOM) {
            this.programs.bloomPrefilter = this.createProgram(baseVertexShader, GLSL_SHADERS.bloomPrefilter);
            this.programs.bloomBlur = this.createProgram(baseVertexShader, GLSL_SHADERS.bloomBlur);
            this.programs.bloomFinal = this.createProgram(baseVertexShader, GLSL_SHADERS.bloomFinal);
        }
        if (this.config.SUNRAYS) {
             this.programs.sunraysMask = this.createProgram(baseVertexShader, GLSL_SHADERS.sunraysMask);
             this.programs.sunrays = this.createProgram(baseVertexShader, GLSL_SHADERS.sunrays);
        }
    }

    private initFBOs() {
        const gl = this.gl as WebGL2RenderingContext;
        const simRes = this.getResolution(this.config.SIM_RESOLUTION);
        const dyeRes = this.getResolution(this.config.DYE_RESOLUTION);

        const halfFloat = gl.HALF_FLOAT;
        const filtering = this.ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        
        this.dye = this.createDoubleFBO(dyeRes.width, dyeRes.height, gl.RGBA16F, halfFloat, filtering);
        this.velocity = this.createDoubleFBO(simRes.width, simRes.height, gl.RG16F, halfFloat, filtering);
        this.divergence = this.createFBO(simRes.width, simRes.height, gl.R16F, halfFloat, gl.NEAREST);
        this.curl = this.createFBO(simRes.width, simRes.height, gl.R16F, halfFloat, gl.NEAREST);
        this.pressure = this.createDoubleFBO(simRes.width, simRes.height, gl.R16F, halfFloat, gl.NEAREST);

        if(this.config.BLOOM) this.initBloomFBOs();
        if(this.config.SUNRAYS) this.initSunraysFBOs();
    }
    
    private createFBO(w: number, h: number, internalFormat: number, format: number, filtering: number) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, gl.getParameter(internalFormat === (gl as any).RGBA16F ? (gl as any).RGBA : (internalFormat === (gl as any).RG16F ? 0x8227 : 0x1903)), format, null);
        
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        return { texture, fbo, width: w, height: h, attach: (id: number) => {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }};
    }
    
    private createDoubleFBO(w: number, h: number, internalFormat: number, format: number, filtering: number) {
        let fbo1 = this.createFBO(w, h, internalFormat, format, filtering);
        let fbo2 = this.createFBO(w, h, internalFormat, format, filtering);
        return {
            get read() { return fbo1; },
            set read(value) { fbo1 = value; },
            get write() { return fbo2; },
            set write(value) { fbo2 = value; },
            swap() {
                const temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }
    
    private initBloomFBOs() {
        const gl = this.gl as WebGL2RenderingContext;
        const res = this.getResolution(this.config.BLOOM_RESOLUTION);
        const halfFloat = gl.HALF_FLOAT;
        const filtering = this.ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        this.bloom = this.createFBO(res.width, res.height, gl.RGBA16F, halfFloat, filtering);
        
        this.bloomFramebuffers = {
            read: this.createFBO(res.width, res.height, gl.RGBA16F, halfFloat, filtering),
            write: this.createFBO(res.width, res.height, gl.RGBA16F, halfFloat, filtering),
            swap() { const temp = this.read; this.read = this.write; this.write = temp; }
        };
    }

    private initSunraysFBOs() {
        const gl = this.gl as WebGL2RenderingContext;
        const res = this.getResolution(this.config.SUNRAYS_RESOLUTION);
        const halfFloat = gl.HALF_FLOAT;
        const filtering = this.ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        this.sunrays = this.createFBO(res.width, res.height, gl.R16F, halfFloat, filtering);
        this.sunraysTemp = this.createFBO(res.width, res.height, gl.R16F, halfFloat, filtering);
    }
    
    private getResolution(resolution: number) {
        const gl = this.gl;
        let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

        let min = Math.round(resolution);
        let max = Math.round(resolution * aspectRatio);

        if (gl.drawingBufferWidth > gl.drawingBufferHeight)
            return { width: max, height: min };
        else
            return { width: min, height: max };
    }


    public resize() {
        const gl = this.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        
        this.initFBOs();
    }

    public addInitialSplat() {
        const amount = 5;
        for (let i = 0; i < amount; i++) {
            const color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
            const x = Math.random();
            const y = Math.random();
            const dx = (Math.random() - 0.5) * 1000;
            const dy = (Math.random() - 0.5) * 1000;
            this.splat({ x: x * window.innerWidth, y: y * window.innerHeight, dx, dy, color } as Pointer);
        }
    }

    public splat(pointer: Pointer) {
        const gl = this.gl;
        const { SPLAT_FORCE, SPLAT_RADIUS } = this.config;
        gl.viewport(0, 0, this.velocity.read.width, this.velocity.read.height);
        this.useProgram(this.programs.splat);
        gl.uniform1i(this.programs.splat.uniforms.uTarget, this.velocity.read.attach(0));
        gl.uniform1f(this.programs.splat.uniforms.aspectRatio, gl.canvas.width / gl.canvas.height);
        gl.uniform2f(this.programs.splat.uniforms.point, pointer.x / gl.canvas.width, 1.0 - pointer.y / gl.canvas.height);
        gl.uniform3f(this.programs.splat.uniforms.color, pointer.dx * SPLAT_FORCE, -pointer.dy * SPLAT_FORCE, 1.0);
        gl.uniform1f(this.programs.splat.uniforms.radius, SPLAT_RADIUS / 100.0);
        this.blit(this.velocity.write.fbo);
        this.velocity.swap();
        
        gl.viewport(0, 0, this.dye.read.width, this.dye.read.height);
        gl.uniform1i(this.programs.splat.uniforms.uTarget, this.dye.read.attach(0));
        const color = this.generateColor();
        gl.uniform3f(this.programs.splat.uniforms.color, color.r, color.g, color.b);
        this.blit(this.dye.write.fbo);
        this.dye.swap();
    }

    private generateColor() {
        // Colors derived from the website's new theme
        const palette = [
            { r: 56, g: 116, b: 232 }, // accent
            { r: 42, g: 90, b: 184 },  // accent-dark
            { r: 240, g: 242, b: 245 } // text-primary
        ];
        const c = palette[Math.floor(Math.random() * palette.length)];
        c.r *= 0.1;
        c.g *= 0.1;
        c.b *= 0.1;
        return c;
    }
    
    private useProgram(program: { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null>; }) {
        this.gl.useProgram(program.program);
    }
    
    private blit(targetFBO: WebGLFramebuffer | null) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        gl.disableVertexAttribArray(0);
    }
    
    public step(dt: number, pointers: Pointer[]) {
        const gl = this.gl;
        const simRes = this.getResolution(this.config.SIM_RESOLUTION);
        gl.viewport(0, 0, simRes.width, simRes.height);

        // Advection
        this.useProgram(this.programs.advection);
        gl.uniform2f(this.programs.advection.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.advection.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(this.programs.advection.uniforms.uSource, this.velocity.read.attach(0));
        gl.uniform1f(this.programs.advection.uniforms.dt, dt);
        gl.uniform1f(this.programs.advection.uniforms.dissipation, this.config.VELOCITY_DISSIPATION);
        this.blit(this.velocity.write.fbo);
        this.velocity.swap();

        // Vorticity & Curl
        this.useProgram(this.programs.curl);
        gl.uniform2f(this.programs.curl.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.curl.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.curl.fbo);

        this.useProgram(this.programs.vorticity);
        gl.uniform2f(this.programs.vorticity.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.vorticity.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(this.programs.vorticity.uniforms.uCurl, this.curl.attach(1));
        gl.uniform1f(this.programs.vorticity.uniforms.curl, this.config.CURL);
        gl.uniform1f(this.programs.vorticity.uniforms.dt, dt);
        this.blit(this.velocity.write.fbo);
        this.velocity.swap();

        // Divergence
        this.useProgram(this.programs.divergence);
        gl.uniform2f(this.programs.divergence.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.divergence.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.divergence.fbo);

        // Pressure
        this.useProgram(this.programs.clear);
        gl.uniform1i(this.programs.clear.uniforms.uTexture, this.pressure.read.attach(0));
        gl.uniform1f(this.programs.clear.uniforms.value, this.config.PRESSURE);
        this.blit(this.pressure.write.fbo);
        this.pressure.swap();
        
        this.useProgram(this.programs.pressure);
        gl.uniform2f(this.programs.pressure.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.pressure.uniforms.uDivergence, this.divergence.attach(0));
        for (let i = 0; i < this.config.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(this.programs.pressure.uniforms.uPressure, this.pressure.read.attach(1));
            this.blit(this.pressure.write.fbo);
            this.pressure.swap();
        }

        // Gradient Subtract
        this.useProgram(this.programs.gradientSubtract);
        gl.uniform2f(this.programs.gradientSubtract.uniforms.texelSize, 1.0 / simRes.width, 1.0 / simRes.height);
        gl.uniform1i(this.programs.gradientSubtract.uniforms.uPressure, this.pressure.read.attach(0));
        gl.uniform1i(this.programs.gradientSubtract.uniforms.uVelocity, this.velocity.read.attach(1));
        this.blit(this.velocity.write.fbo);
        this.velocity.swap();
        
        // Dye advection
        const dyeRes = this.getResolution(this.config.DYE_RESOLUTION);
        gl.viewport(0, 0, dyeRes.width, dyeRes.height);
        this.useProgram(this.programs.advection);
        gl.uniform1i(this.programs.advection.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(this.programs.advection.uniforms.uSource, this.dye.read.attach(1));
        gl.uniform1f(this.programs.advection.uniforms.dissipation, this.config.DENSITY_DISSIPATION);
        this.blit(this.dye.write.fbo);
        this.dye.swap();
    }
    
    public render() {
        const gl = this.gl;
        if(this.config.BLOOM) this.applyBloom(this.dye.read, this.bloom);
        if(this.config.SUNRAYS) {
            this.applySunrays(this.dye.read, this.dye.write, this.sunrays);
        }

        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        gl.viewport(0, 0, width, height);

        this.useProgram(this.programs.display);
        gl.uniform2f(this.programs.display.uniforms.texelSize, 1.0 / width, 1.0 / height);
        gl.uniform1i(this.programs.display.uniforms.uTexture, this.dye.read.attach(0));
        if (this.config.BLOOM)
            gl.uniform1i(this.programs.display.uniforms.uBloom, this.bloom.attach(1));
        if (this.config.SUNRAYS)
            gl.uniform1i(this.programs.display.uniforms.uSunrays, this.sunrays.attach(2));

        this.blit(null);
        gl.disable(gl.BLEND);
    }
    
    private applyBloom(source: any, destination: any) {
        const gl = this.gl;
        if(this.programs.bloomPrefilter) {
            this.useProgram(this.programs.bloomPrefilter);
            const knee = this.config.BLOOM_THRESHOLD * this.config.BLOOM_SOFT_KNEE + 0.0001;
            const curve = [this.config.BLOOM_THRESHOLD - knee, knee * 2, 0.25 / knee];
            gl.uniform3f(this.programs.bloomPrefilter.uniforms.curve, curve[0], curve[1], curve[2]);
            gl.uniform1f(this.programs.bloomPrefilter.uniforms.threshold, this.config.BLOOM_THRESHOLD);
            gl.uniform1i(this.programs.bloomPrefilter.uniforms.uTexture, source.attach(0));
            gl.viewport(0, 0, destination.width, destination.height);
            this.blit(destination.fbo);
        }
        
        this.useProgram(this.programs.bloomBlur);
        for (let i = 0; i < this.config.BLOOM_ITERATIONS; i++) {
            const radius = this.config.BLOOM_ITERATIONS - i - 1;
            gl.uniform2f(this.programs.bloomBlur.uniforms.texelSize, 1.0 / destination.width, 1.0 / destination.height);
            gl.uniform1i(this.programs.bloomBlur.uniforms.uTexture, destination.attach(0));
            gl.uniform1f(this.programs.bloomBlur.uniforms.radius, radius);
            this.blit(this.bloomFramebuffers.write.fbo);
            this.bloomFramebuffers.swap();
        }
        
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.BLEND);
        
        for (let i = 0; i < this.config.BLOOM_ITERATIONS; i++) {
            const radius = i;
            gl.uniform2f(this.programs.bloomBlur.uniforms.texelSize, 1.0 / destination.width, 1.0 / destination.height);
            gl.uniform1i(this.programs.bloomBlur.uniforms.uTexture, this.bloomFramebuffers.read.attach(0));
            gl.uniform1f(this.programs.bloomBlur.uniforms.radius, radius);
            this.blit(this.bloomFramebuffers.write.fbo);
            this.bloomFramebuffers.swap();
        }
        
        gl.disable(gl.BLEND);
        
        this.useProgram(this.programs.bloomFinal);
        gl.uniform2f(this.programs.bloomFinal.uniforms.texelSize, 1.0 / destination.width, 1.0 / destination.height);
        gl.uniform1i(this.programs.bloomFinal.uniforms.uTexture, destination.attach(0));
        gl.uniform1f(this.programs.bloomFinal.uniforms.intensity, this.config.BLOOM_INTENSITY);
        this.blit(null);
    }
    
    private applySunrays(source: any, mask: any, destination: any) {
        const gl = this.gl;
        gl.disable(gl.BLEND);
        
        if (this.programs.sunraysMask) {
            this.useProgram(this.programs.sunraysMask);
            gl.uniform1i(this.programs.sunraysMask.uniforms.uTexture, source.attach(0));
            gl.viewport(0, 0, mask.width, mask.height);
            this.blit(mask.fbo);
        }

        if (this.programs.sunrays) {
            this.useProgram(this.programs.sunrays);
            gl.uniform1f(this.programs.sunrays.uniforms.weight, this.config.SUNRAYS_WEIGHT);
            gl.uniform1i(this.programs.sunrays.uniforms.uTexture, mask.attach(0));
            gl.viewport(0, 0, destination.width, destination.height);
            this.blit(destination.fbo);
        }
    }
}

// GLSL Shader strings
const GLSL_SHADERS = {
    baseVertex: `
        precision highp float;
        attribute vec2 a_position;
        varying vec2 v_texcoord;
        void main () {
            v_texcoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `,
    clear: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform float value;
        void main () {
            gl_FragColor = value * texture2D(uTexture, v_texcoord);
        }
    `,
    display: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform sampler2D uBloom;
        uniform sampler2D uSunrays;
        void main () {
            vec3 c = texture2D(uTexture, v_texcoord).rgb;
            vec3 bloom = texture2D(uBloom, v_texcoord).rgb;
            vec3 sunrays = texture2D(uSunrays, v_texcoord).rgb;
            c += bloom * 0.5 + sunrays * 0.3;
            gl_FragColor = vec4(c, 1.0);
        }
    `,
    splat: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
            vec2 p = v_texcoord - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, v_texcoord).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
    `,
    advection: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform float dt;
        uniform float dissipation;
        void main () {
            vec2 coord = v_texcoord - dt * texture2D(uVelocity, v_texcoord).xy * texelSize;
            gl_FragColor = dissipation * texture2D(uSource, coord);
        }
    `,
    divergence: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uVelocity;
        uniform vec2 texelSize;
        void main () {
            float L = texture2D(uVelocity, v_texcoord - vec2(texelSize.x, 0.0)).x;
            float R = texture2D(uVelocity, v_texcoord + vec2(texelSize.x, 0.0)).x;
            float B = texture2D(uVelocity, v_texcoord - vec2(0.0, texelSize.y)).y;
            float T = texture2D(uVelocity, v_texcoord + vec2(0.0, texelSize.y)).y;
            vec2 C = texture2D(uVelocity, v_texcoord).xy;
            if (v_texcoord.x < texelSize.x) { L = -C.x; }
            if (v_texcoord.x > 1.0 - texelSize.x) { R = -C.x; }
            if (v_texcoord.y < texelSize.y) { B = -C.y; }
            if (v_texcoord.y > 1.0 - texelSize.y) { T = -C.y; }
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `,
    curl: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uVelocity;
        uniform vec2 texelSize;
        void main () {
            float L = texture2D(uVelocity, v_texcoord - vec2(texelSize.x, 0.0)).y;
            float R = texture2D(uVelocity, v_texcoord + vec2(texelSize.x, 0.0)).y;
            float B = texture2D(uVelocity, v_texcoord - vec2(0.0, texelSize.y)).x;
            float T = texture2D(uVelocity, v_texcoord + vec2(0.0, texelSize.y)).x;
            float curl = T - B - (R - L);
            gl_FragColor = vec4(0.5 * curl, 0.0, 0.0, 1.0);
        }
    `,
    vorticity: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        uniform vec2 texelSize;
        void main () {
            float L = texture2D(uCurl, v_texcoord - vec2(texelSize.x, 0.0)).x;
            float R = texture2D(uCurl, v_texcoord + vec2(texelSize.x, 0.0)).x;
            float B = texture2D(uCurl, v_texcoord - vec2(0.0, texelSize.y)).x;
            float T = texture2D(uCurl, v_texcoord + vec2(0.0, texelSize.y)).x;
            float C = texture2D(uCurl, v_texcoord).x;
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force = normalize(force + 0.0001) * curl * C;
            vec2 vel = texture2D(uVelocity, v_texcoord).xy;
            gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
        }
    `,
    pressure: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        uniform vec2 texelSize;
        void main () {
            float L = texture2D(uPressure, v_texcoord - vec2(texelSize.x, 0.0)).x;
            float R = texture2D(uPressure, v_texcoord + vec2(texelSize.x, 0.0)).x;
            float B = texture2D(uPressure, v_texcoord - vec2(0.0, texelSize.y)).x;
            float T = texture2D(uPressure, v_texcoord + vec2(0.0, texelSize.y)).x;
            float C = texture2D(uPressure, v_texcoord).x;
            float divergence = texture2D(uDivergence, v_texcoord).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
    `,
    gradientSubtract: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        uniform vec2 texelSize;
        void main () {
            float L = texture2D(uPressure, v_texcoord - vec2(texelSize.x, 0.0)).x;
            float R = texture2D(uPressure, v_texcoord + vec2(texelSize.x, 0.0)).x;
            float B = texture2D(uPressure, v_texcoord - vec2(0.0, texelSize.y)).x;
            float T = texture2D(uPressure, v_texcoord + vec2(0.0, texelSize.y)).x;
            vec2 velocity = texture2D(uVelocity, v_texcoord).xy;
            velocity.xy -= 0.5 * vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `,
    bloomPrefilter: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform vec3 curve;
        uniform float threshold;
        void main () {
            vec3 c = texture2D(uTexture, v_texcoord).rgb;
            float br = max(c.r, max(c.g, c.b));
            float rq = clamp(br - curve.x, 0.0, curve.y);
            rq = curve.z * rq * rq;
            c *= max(rq, br - threshold) / max(br, 0.0001);
            gl_FragColor = vec4(c, 0.0);
        }
    `,
    bloomBlur: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform vec2 texelSize;
        uniform float radius;
        void main () {
            vec4 sum = vec4(0.0);
            float w = 0.0;
            // Use a step function to create a multiplier that is 1.0 when inside the radius and 0.0 otherwise.
            // This avoids the dynamic 'if' branch which is not allowed in loops in some GLSL versions.
            // We check against radius + 0.5 to ensure that integer radii are inclusive.
            for (int i = -7; i <= 7; i++) {
                float i_f = float(i);
                float factor = 1.0 - step(radius + 0.5, abs(i_f));
                float wi = (radius > 0.0) ? exp(-i_f * i_f / (2.0 * radius * radius)) : (i == 0 ? 1.0 : 0.0);
                sum += texture2D(uTexture, v_texcoord + i_f * texelSize) * wi * factor;
                w += wi * factor;
            }
            if (w > 0.0) {
                gl_FragColor = sum / w;
            } else {
                gl_FragColor = texture2D(uTexture, v_texcoord);
            }
        }
    `,
    bloomFinal: `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform float intensity;
        void main () {
            gl_FragColor = vec4(texture2D(uTexture, v_texcoord).rgb * intensity, 1.0);
        }
    `,
    sunraysMask: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        void main () {
            vec4 c = texture2D(uTexture, v_texcoord);
            float br = max(c.r, max(c.g, c.b));
            c.a = pow(br, 2.0) * 0.5;
            gl_FragColor = c;
        }
    `,
    sunrays: `
        precision highp float;
        precision highp sampler2D;
        varying vec2 v_texcoord;
        uniform sampler2D uTexture;
        uniform float weight;
        void main () {
            float DU = 0.0078125;
            vec2 dv = normalize(vec2(0.5, 0.5) - v_texcoord) * DU;
            vec4 c = texture2D(uTexture, v_texcoord);
            float illum = c.a;
            // The loop condition must be a constant expression in GLSL ES 1.0.
            // A variable 'SAMPLES' was used, causing a compile error. Replaced with a constant.
            for (int i = 0; i < 128; i++) {
                c = texture2D(uTexture, v_texcoord + float(i) * dv);
                illum += c.a;
            }
            gl_FragColor = vec4(illum * weight, 0.0, 0.0, 1.0);
        }
    `
};

export default Background;