type PageAnchor = string | {
    role?: Role;
    name: string;
    url?: string;
    subAnchors?: Array<PageAnchor>;
};