import Fuse from "fuse.js"
export function fuzzySearch(list, search){
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
         threshold: 0.4,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "title"
        ]
    };
    
    const fuse = new Fuse(list, fuseOptions);
    
    // Change the pattern
    const searchPattern = search
    
    return fuse.search(searchPattern)


}