import axios from 'axios';

class ApiCall{

    public link:string;
    private PATH_BASE:string = 'http://localhost:5000/api/product';

    public result(post:object = {}){
        if (this.checkObjectEmpty(post)){
            return this.MakeGetCall();
        }
        return this.MakePostCall(post);
    }

    public setURL(link: string, first: string = "", seccend: string = ""){
        switch (link) {
            case "allProducts":
                this.link = "/product";
            break;

            case "details":
                this.link = "/product/${first}/details";
            break;

            case "search":
                this.link = "/product/search/${first}";
            break;

            default:
                this.link = "/product";
                return "there was no availeble option defined. basic path used!";
        }
        return "Path defined. used path for ${link}";
    }

    private MakeGetCall(){
        axios.get(this.PATH_BASE + this.link)
            .then( res => {
               return res.data;
            })
            .catch( err => {
                console.log(err);
                return err;
            });
    }


    private MakePostCall(post) {
        axios.post(this.PATH_BASE + this.link,{
            post
        })
            .then(res => {
                return res;
            })
            .catch( err => {
                console.log(err);
                return err;
            });
    }

    private checkObjectEmpty(obj){
        for(const key in obj) {
            if (obj.hasOwnProperty(key))
            {
                return false;
            }
        }
        return true;
    }
}

export default ApiCall;

