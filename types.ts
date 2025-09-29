import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  slug?: string;
}
