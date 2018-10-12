 import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: null,
            categories: [],
        }
    }


    componentDidMount() {
        this.searchCategory(this.state.query);
    }

    onChange(e) {
        this.setState({ query: e.target.value }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.searchCategory(this.state.query);
                }
            } else {
                this.searchCategory(this.state.query);
            }
        })
    }

    searchCategory(query) {
        const url = "https://localhost:5000/api/categories/{category=string}/";

        if (query) {
            // if get value in query so filter the data based on the query.
            fetch(url, {
                method: 'Get'
            }).then(results => {
                return results.json();
            }).then(data => {
                let categories = data.results.filter(category => category.Name === query).map((Category) => {
                    return (
                        <ul key={Category.Name}>
                            <li>{Category.Name}</li>
                        </ul>
                    )
                })
                this.setState({ categories: categories });
                console.log("state", categories)
            })
        } else {
            fetch(url, {
                method: 'GET'
            }).then(results => {
                return results.json();
            }).then(data => {
                let categories = data.results.map((category) => {
                    return (
                        <ul key={Category.Name}>
                            <li>{Category.Name}</li>
                        </ul>
                    )
                })
                this.setState({ categories: categories });
                console.log("state", categories)
            })
        }
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for..."
                    onChange={this.onChange.bind(this)}
                />
                {this.state.categories}
            </form>
        )
    }
}

export default Search;

// class App extends Component
// {
//     constructor(props)
//     {
//         super(props);
//         this.state = {
//             result : null, searchTerm : DEFAULT_QUERY,
            
//         };
//         console.log("test1");
//         this.setSearchTopStories = this.setSearchTopStories.bind(this);
//         this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
//         this.onSearchChange = this.onSearchChange.bind(this);
//         this.onSearchSubmit = this.onSearchSubmit.bind(this);
//         this.onDismiss = this.onDismiss.bind(this);
//     }

//     // const UrlString = "http://localhost:5000/api/categories/heren";

//     fetchSearchTopStories(searchTerm) {
//         fetch(UrlString = "http://localhost:5000/api/categories/heren")
//         .then(response => response.json())
//         .then(result => this.setSearchTopStories(result))
//         .catch(error => error);
//         console.log("test2");
//         }
        

//         componentDidMount() {
//             const { searchTerm } = this.state;
//             this.fetchSearchTopStories(searchTerm);
//         }
//         onSearchSubmit() {
//             const { searchTerm } = this.state;
//             this.fetchSearchTopStories(searchTerm);
//             }

//             render()
//             {
//                 const {searchTerm, result} = this.state;
//                 return (
//                     <div className = "App">
//                     <div className = "Interactions">
//                     <Search
//                     value = {searchTerm}
//                     onChange = {this.onSearchChange}
//                     onSubmit = {this.onSearchSubmit}
//                     >
//                     Search
//                     </Search>
//                     </div>
//                     {result && 
//                     <Table
//                     list = {result.hits}
                
//                     onDismiss = {this.onDismiss}
//                     />
                    
                
//                 }
//                 </div>

//                 );
//             }
    
// }
// const Search = ({
//     value,
//     onChange,
//     onSubmit,
//     children
//     }) =>
//     <form onSubmit={onSubmit}>
//     <input
//     type="text"
//     value={value}
//     onChange={onChange}
//     />
//     <button type="submit">
//     {children}
//     </button>
//     </form>