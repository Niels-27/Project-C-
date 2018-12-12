import axios from 'axios';

class ApiCall {

    public link: string;
    private PATH_BASE: string = 'http://localhost:5000/api';

    public async result(post: object = {}) {

        if (this.checkObjectEmpty(post)) {
            return await this.MakeGetCall();
        }
        return this.MakePostCall(post);
    }

    public setURL(link: string, first: string = "", second: string = "") {
        switch (link) {
            case "allProducts":
                this.link = "/product";
                break;
            case "categorie":
                this.link = "/categories/" + first;
                break;

            case "details":
                this.link = "/product/" + first + "/details";
                break;

            case "pageNation":
                this.link = "/product/paged/"+ first + "/" + second;

                break;
            case "array-id":
                this.link = "/products-by/array";
                break;
            case "authenticate":
                this.link = "/user/authenticate";
                break;
            case "search":{
                if(second !== "all" && second){
                    this.link = "/categories/" + second + "/" + first;
                }
                else{
                    this.link = "/product/search/" + first;
                }
                break;  
            }
            case "paymentSucces":
                this.link = "/PayEmail/" + first + "/" + second;;
                break;
            case "userdata":
                this.link = "/user/getUserInfo";
                break;
            case "checkuser":
                this.link = "/user/checkuser";
                break;
            case "register":
                this.link = "/user/register";
                break;  
            case "checkemail":
                this.link = "/user/checkemail";
                break;       
            case "Adminuserdata":
                this.link = "/admin/users/all";
                break;       
            case "AdminuserdataView":
                this.link = "/admin/users/byid/" + first;
                break;        
            default:
                this.link = "/product";
                return "there was no availeble option defined. basic path used!";
        }
        console.log(this.link);
        return "Path defined. used path for ${link}";
    }

    private MakeGetCall() {
        return axios.get(this.PATH_BASE + this.link)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return {};
            });
    }


    private MakePostCall(post) {
        console.log(post);
        return axios.post(this.PATH_BASE + this.link, 
            JSON.stringify(post)
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(post);
                console.log(err);
                return err;
            });
    }

    private checkObjectEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}

export default ApiCall;

