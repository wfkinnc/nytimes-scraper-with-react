import axios from "axios";

export default {

    getArticles: function(){
        console.log("trying to run this from src/utils/api.js - getArticles ")
        return axios.get("/api/articles")
    },

    getNewArticles: function(queryData){
        console.log("from utils/API/getNewArticles - req " + JSON.stringify(queryData))
        let apiKey          = "eb6b7339b5184694b9df1a7244e77df6";
        let queryURLBase    = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+apiKey+"&limit=2&q=";
        queryURLBase = queryURLBase + queryData.topic;
        queryURLBase = queryURLBase + "&begin_date="+queryData.startYear+"0101";
        if (queryData.endYear !== ""){
            queryURLBase = queryURLBase + "&end_date="+queryData.endYear+"1231";           
        }

        console.log("from getNewARticles " + queryURLBase);
        // return axios.get("/api/articles", queryData);
        return axios.get(queryURLBase);

    },// end 

    saveArticle: function(saveData){
        //////////////////////////////////////////////////////////////////////////
        // invokes the axios.post call to the contorllere to save the article
        //////////////////////////////////////////////////////////////////////////

        console.log("from utils/API/saveArticle - req " + JSON.stringify(saveData)  );
        return axios.post("/api/articles",saveData);
    }, // end  saveArticle

    deleteArticle: function(delId){
        //////////////////////////////////////////////////////////////////////////
        // invokes the axios.delete call to the controller to delete the aritcle
        //////////////////////////////////////////////////////////////////////////
        console.log("from utils/API/deleteArticle - req " + delId)
        return axios.delete("/api/articles/" + delId)

    }// end deleteArticle
};