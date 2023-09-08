class ApiFeature {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }
    pagination() {
        let page = this.queryString.page * 1 || 1; //we use oring with 1 if ther is no page
        if (this.queryString.page <= 0) page = 1  //conditon if the page a wrong number less than 1 
        let skip = (page - 1) * 4
        this.page = page
        this.mongooseQuery.skip(skip).limit(4)
        return this;
    }
    filter() {
        let filterObj = { ...this.queryString }
        let excludedQuery = ["page", "sort", "keyword", "fields"]
        //to delete any query in the array before form the filterOb
        excludedQuery.forEach((q) => {
            delete filterObj[q]
        })
        //to find products with prices higher than  500 find({price:{$gte:500}})
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ")  //to sort by multiple things
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }

    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } },
                    { name: { $regex: this.queryString.keyword, $options: "i" } }
                ]
            })
        }
        return this
    }

    field() {
        if (this.queryString.field) {
            let field = this.queryString.field.split(",").join(" ")
            this.mongooseQuery.select(field)
        }
        return this
    }

}

export default ApiFeature