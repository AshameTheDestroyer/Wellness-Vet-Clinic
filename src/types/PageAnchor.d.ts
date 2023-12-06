type PageAnchor = string | {
    name: string;
    url?: string;
    subAnchors?: Array<PageAnchor>;
};