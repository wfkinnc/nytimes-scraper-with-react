import React, {Component}       from "react";
// containers for the bootstrap
import Badge                    from "../../components/Badge";
import Jumbotron                from "../../components/Jumbotron";
import { Col, Row, Container }  from "../../components/Grid";
import API                      from "../../utils/API.js"
import { List, ListItem }       from "../../components/List";
import { Input, FormBtn } from "../../components/Form";


class Articles extends Component{

    state={

        articles:[],
        newArticles:[],
        topic:"",
        startYear:"",
        endYear:"",
    }

    componentDidMount(){
        console.log("running lo pages/Articles/Articles.js componentDidMount()")
        this.loadArticles();
    }

    handleInputChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });

    };

    loadArticles = () =>{
        ////////////////////////////////////////////////////////////////////////
        // loades the articles from mongo
        ////////////////////////////////////////////////////////////////////////

        console.log("tring to run loadArticles")
        API.getArticles()
            .then(res => {
                    this.setState({articles: res.data})
                    console.log("finished runing loadArticles " )
                    //+JSON.stringify( res.data));   
                }
            )
            .catch(err=> console.log(err));
    }; // end loadArticles

    saveArticle = (newArticle) =>{
        ////////////////////////////////////////////////////////////////////////
        // SAves the selected aarticle for the JSON object in newArticle (passfrom the onClick event)
        ////////////////////////////////////////////////////////////////////////
        console.log("from pages/Articles/Articles.js - saveArticle - send ");
        // + JSON.stringify(newArticle));
        var passNewArticle = {
            title:newArticle.title,
            url:newArticle.url
        }
        API.saveArticle({
            passNewArticle

        })
        .then(res => {
            console.log("from pages/Article/Aricles.js - saveArticle - receive " + JSON.stringify(res.data));
            this.loadArticles();
        })
        .catch(err => console.log(err));

    }

    deleteArticle = (deleteId) =>{
    ////////////////////////////////////////////////////////////////////////
    // deletes teh selected article and refreshes the page
    ////////////////////////////////////////////////////////////////////////
    console.log("from pages/Articles/deleteArticle - req " + deleteId);

        API.deleteArticle(deleteId)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));

    }

    handleFormSubmit = (event) =>{
    ////////////////////////////////////////////////////////////////////////
    // submits the button action to return data from nytimes
    ////////////////////////////////////////////////////////////////////////
        // prevents default behavior
        console.log("from pages/Articles/Artiles.js - handleFormSubmit")
        event.preventDefault();

        if (this.state.topic && this.state.startYear){
            API.getNewArticles({
                topic: this.state.topic,
                startYear: this.state.startYear,
                endYear: this.state.endYear
            })// end getArticles
                .then(res =>{ 
                    var holdArticles = res.data.response.docs;

                    var arrayNewArticles = {};
                    arrayNewArticles.newArticles = [];

                    for (var i = 0; i < holdArticles.length; i++){
                        var tmpArticle = holdArticles[i];

                        arrayNewArticles.newArticles.push({
                            "key":i,
                            "title":tmpArticle.snippet,
                            "url":tmpArticle.web_url
                        })


                    }
                    console.log("from pages/articles/Articles.js - getNewArticles - response - " );
                    //+ JSON.stringify(arrayNewArticles))
                    this.setState({newArticles: arrayNewArticles.newArticles})
                })
                .catch(err => console.log(err));
        }// endn  if
    }

    render(){
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                         
                                <h1>New York Times Scraper</h1>
                                <p className="lead">Annotations</p>
                            </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6">

                        <div>
                        <Badge>
                            <h2>Search</h2>
                        </Badge>
                        <form>
                            <Input 
                                name="topic" 
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                placeholder="Topic (required)" />
                            <Input 
                                name="startYear" 
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                placeholder="Start Year (required)" />
                            <Input 
                                name="endYear" 
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                placeholder="End Year (Optional)" />
                            <FormBtn
                                disabled={!(this.state.topic && this.state.startYear)}
                                onClick={this.handleFormSubmit}>
                                Search
                            </FormBtn>

                        </form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6">
                        <div>
                            <Badge>
                                <h2>Scraped Articles for: {this.state.topic}</h2>
                            </Badge>

                            <List>
                                    {this.state.newArticles.map(newArticle =>(
                                        <ListItem key={newArticle.key} >
                                            {/* <a href={"/articles/" + article._id}> */}
                                                <strong>
                                                    <img src="../../../images/save.png" width="35px" alt="Save" onClick={() => this.saveArticle(newArticle)}/>{newArticle.title}
                                                </strong>

                                            {/* </a> */}
                                        </ListItem>
                                    ))}
                                </List>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col size="md-6">
                        <div>
                        {this.state.articles.length ? (
                            <div>
                                <Badge>
                                    <h2>Saved Articles</h2>
                                </Badge>
                                <List>
                                    {this.state.articles.map(article =>(
                                        <ListItem key={article._id}>
                                          <img src="../../../images/delete.png" width="25px" alt="Delete" onClick={() =>this.deleteArticle(article._id)}/>  
                                            <a href={article.url} target="_new">
                                                <strong>
                                                    {article.title}
                                                </strong>
                                            </a>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </div>
                    </Col>
                </Row>
            </Container>
        );// 
    }// end render
}// end class

export default Articles;