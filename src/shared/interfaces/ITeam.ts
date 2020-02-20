export interface ITeam {
  id: string;
  displayName: string;
  description: string;
  isArchived: boolean;
  visibility: string;
  owners: string;
  members: number;
  lastModified: Date;
  lastChat: Date;
  siteUrl: string;
}
