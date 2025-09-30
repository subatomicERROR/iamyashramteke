import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  slug?: string;
}

export interface Exploration {
  title: string;
  description: string;
  url?: string;
  slug?: string;
  icon: React.ComponentType<{ className?: string }>;
}
