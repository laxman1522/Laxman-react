

let filteredBlogTitle: any = [];

export const updateSelectedBlogDetails = (blogData: any, types: any, allowEdit: any, searchTerm: any, blogAdded: any, blogDetails:any) => {

    let updatedBlogDetails: any = {};
    let detailsUpdated = false;
    let alreadySelected = false;

    const blogList = blogData.filter((blog: any, index: number) => {
        index === 0 && (filteredBlogTitle = [])
        //INFO: (checking whether the blog is included in the user selected types or a part of custom type) and matches the user search term
        if((types.includes(blog.type.toLocaleLowerCase())) && blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        {
            filteredBlogTitle.push(blog.title)
            
            return blog;
        }
    }).map((blog:any, index: number) => {
        if(!allowEdit) {
         if(searchTerm !=="" && blog.title.toLowerCase().includes(searchTerm) && (index===0) ) {
            updatedBlogDetails = blog;
            detailsUpdated = true;
        } else {
            if(blogDetails.title && (blogDetails.title !== blog.title) && types.includes(blogDetails.type.toLocaleLowerCase()) && (blogDetails.title === blog.title) && (index===0)) {
                updatedBlogDetails = blog;
                detailsUpdated = true;
            }
            else if(blog.title === blogDetails.title) {
                !detailsUpdated && (alreadySelected = true);
                detailsUpdated = true;
            }
             else if(index===0 && ( types.length !== blogAdded ? 4 : 3 ) && !filteredBlogTitle.includes(blogDetails.title) ) {
                updatedBlogDetails = blog;
                detailsUpdated = true;
            }  
        }
    }
    })

    return  {alreadySelected,updatedBlogDetails};
}