import { Github, FileCode, Brain, Database, FileText, Package, Puzzle, Lock } from "lucide-react";
import type { ProjectType } from "@/data/projects";

export const getProjectIcon = (type: ProjectType, isPrivate?: boolean, size: number = 20) => {
  if (isPrivate) return <Lock size={size} className="text-primary" />;
  
  switch (type) {
    case 'gist':
      return <FileCode size={size} className="text-foreground" />;
    case 'huggingface':
      return <Brain size={size} className="text-foreground" />;
    case 'data':
      return <Database size={size} className="text-foreground" />;
    case 'template':
      return <FileText size={size} className="text-foreground" />;
    case 'library':
      return <Package size={size} className="text-foreground" />;
    case 'plugin':
      return <Puzzle size={size} className="text-foreground" />;
    case 'github':
    default:
      return <Github size={size} className="text-foreground" />;
  }
};

export const getProjectLabel = (type: ProjectType, t: any, isPrivate?: boolean) => {
  if (isPrivate) return t('projects.privateRepo');
  
  switch (type) {
    case 'gist':
      return t('projects.viewGist');
    case 'huggingface':
      return t('projects.viewModel');
    case 'data':
      return t('projects.viewData');
    case 'template':
      return t('projects.viewTemplate');
    case 'library':
      return t('projects.viewLibrary');
    case 'plugin':
      return t('projects.viewPlugin');
    case 'github':
    default:
      return t('projects.code');
  }
};

export const getProjectTypeBadge = (type: ProjectType) => {
  switch (type) {
    case 'gist':
      return 'Gist';
    case 'data':
      return 'Data';
    case 'template':
      return 'Template';
    case 'library':
      return 'Library';
    case 'plugin':
      return 'Plugin';
    case 'huggingface':
      return '🤗 Model';
    default:
      return null;
  }
};
