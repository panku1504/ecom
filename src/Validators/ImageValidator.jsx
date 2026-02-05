export default function ImageValidator(e) {
    if (e.target.files.length === 0)
        return "Pic Field is Mandatory"
    else if (e.target.files.length === 1) {
        let pic = e.target.files[0]
        if (pic.size > 1048576)
            return "Pic size is to high, please upload an image upto 1MB"
        else if (!(pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif"))
            return "invalid pic format , please uplaod an image of type .jpeg , .jpg , .png , .gif"
        else
            return ""
    }
    else {
        let files = Array.from(e.target.files)
        let errorMessage = []
        files.forEach((pic, index) => {
            if (pic.size > 1048576)
                errorMessage.push(`Pic size${index + 1} is to high, please upload an image upto 1MB`)
            else if (!(pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif"))
                errorMessage.push(`invalid pic${index} format , please uplaod an image of type .jpeg , .jpg , .png , .gif`)
        })
        return errorMessage.length ? errorMessage : ""

    }

}
