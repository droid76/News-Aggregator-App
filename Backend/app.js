qs  = require('query-string');
axios = require('axios');
express = require('express');
app= express();
fetch = require('node-fetch');
cors = require('cors');

var guardian_api_key = "f4edf362-7d73-406b-b67d-15da9801b257";
var guardian_base_url = "https://content.guardianapis.com";

var nyt_api_key = "P9DeHKSC1ciru04DbQgT7puTxwBWYGaD";
var nyt_base_url = "https://api.nytimes.com/svc/topstories/v2/";


guradian_home_url = guardian_base_url+"/search?show-blocks=all&api-key="+guardian_api_key+"&section=(sport|business|technology|politics)&page-size=20";
guradian_url_world = guardian_base_url+"/world?show-blocks=all&api-key="+guardian_api_key;
guradian_url_politics = guardian_base_url+"/politics?show-blocks=all&api-key="+guardian_api_key;
guradian_url_business = guardian_base_url+"/business?show-blocks=all&api-key="+guardian_api_key;
guradian_url_technology = guardian_base_url+"/technology?show-blocks=all&api-key="+guardian_api_key;
guradian_url_sports = guardian_base_url+"/sport?show-blocks=all&api-key="+guardian_api_key;

nyt_home_url =  nyt_base_url+"home.json?api-key="+nyt_api_key;
nyt_world_url =  nyt_base_url+"world.json?api-key="+nyt_api_key;
nyt_politics_url =  nyt_base_url+"politics.json?api-key="+nyt_api_key;
nyt_business_url =  nyt_base_url+"business.json?api-key="+nyt_api_key;
nyt_technology_url =  nyt_base_url+"technology.json?api-key="+nyt_api_key;
nyt_sports_url =  nyt_base_url+"sports.json?api-key="+nyt_api_key;

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/guardianHome',(req,res)=>{
    fetch(guradian_home_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.response.results;
        results = []
        for(i=0;i<jsonFiles.length;i++)
        {
            if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
            {
                results.push(jsonFiles[i]);
            }
        }
        res.send(results);
    
    }).catch((err) => {
        console.log(err)} 
        )});

    app.get('/guardianWorld',(req,res)=>{
        fetch(guradian_url_world).then(res => res.json())
        .then(json => {
            jsonFiles = json.response.results;
            results = []
            for(i=0;i<jsonFiles.length;i++)
            {
                if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
                {
                    results.push(jsonFiles[i]);
                }
            }
            res.send(results);
        
        }).catch((err) => {
            console.log(err)} 
            )});
     app.get('/guardianPolitics',(req,res)=>{
        fetch(guradian_url_politics).then(res => res.json())
        .then(json => {
            jsonFiles = json.response.results;
            results = []
            for(i=0;i<jsonFiles.length;i++)
            {
                if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
                {
                    results.push(jsonFiles[i]);
                }
            }
            res.send(results);
        
        }).catch((err) => {
            console.log(err)} 
            )});
 app.get('/guardianBusiness',(req,res)=>{
        fetch(guradian_url_business).then(res => res.json())
        .then(json => {
            jsonFiles = json.response.results;
            results = []
            for(i=0;i<jsonFiles.length;i++)
            {
                if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
                {
                    results.push(jsonFiles[i]);
                }
            }
            res.send(results);
        
        }).catch((err) => {
            console.log(err)} 
            )});
app.get('/guardianTechnology',(req,res)=>{
fetch(guradian_url_technology).then(res => res.json())
.then(json => {
    jsonFiles = json.response.results;
    results = []
    for(i=0;i<jsonFiles.length;i++)
    {
        if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
        {
            results.push(jsonFiles[i]);
        }
    }
    res.send(results);

}).catch((err) => {
    console.log(err)} 
    )});
app.get('/guardianSports',(req,res)=>{
fetch(guradian_url_sports).then(res => res.json())
.then(json => {
    jsonFiles = json.response.results;
    results = []
    for(i=0;i<jsonFiles.length;i++)
    {
        if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate && jsonFiles[i].blocks.body[0].bodyTextSummary)
        {
            results.push(jsonFiles[i]);
        }
    }
    res.send(results);

}).catch((err) => {
    console.log(err)} 
    )});


app.get('/guardianDetailed',(req,res)=>{
    var guardian_detailed_url = guardian_base_url+"/"+req.query.id+"?api-key="+guardian_api_key+"&show-blocks=all";
    fetch(guardian_detailed_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.response.content;
        res.send(jsonFiles);
    }).catch((err) => {
        console.log(err)} 
        )});

app.get('/guardianSearch',(req,res)=>{
    var guardian_search_url = guardian_base_url+"/search?q="+req.query.q+"&api-key="+guardian_api_key+"&show-blocks=all";
    fetch(guardian_search_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.response.results;
        results = []
        var j=0;
        for(i=0;i<jsonFiles.length;i++)
        {
            if(j<5)
            {
                if(jsonFiles[i].webTitle && jsonFiles[i].sectionId && jsonFiles[i].blocks.main && jsonFiles[i].webPublicationDate)
                {
                    results.push(jsonFiles[i]);
                }
            }
            else
            {
                break;
            }
            j+=1;
        }
        res.send(results);
    }).catch((err) => {
        console.log(err)} 
        )});


app.get('/nytHome',(req,res)=>{
        fetch(nyt_home_url).then(res => res.json())
        .then(json => {
            jsonFiles = json.results;
            results = []
            for(i=0;i<jsonFiles.length;i++)
            {
                if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                {
                    results.push(jsonFiles[i]);
                }
            }
            res.send(results);
        }).catch((err) => {
        console.log(err)} )});

app.get('/nytWorld',(req,res)=>{
    fetch(nyt_world_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.results;
        results = []
        var j=0;
        for(i=0;i<jsonFiles.length;i++)
        {
            if(j<10)
            {
                if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                {
                    
                    results.push(jsonFiles[i]);
                }
            }
            else
            {
                break;
            }
            j+=1;
        }
        res.send(results);
    }).catch((err) => {
    console.log(err)} )});

    app.get('/nytPolitics',(req,res)=>{
        fetch(nyt_politics_url).then(res => res.json())
        .then(json => {
            jsonFiles = json.results;
            results = []
            var j=0;
            for(i=0;i<jsonFiles.length;i++)
            {
                if(j<10)
                {
                    if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                    {
                        
                        results.push(jsonFiles[i]);
                    }
                }
                else
                {
                    break;
                }
                j+=1;
            }
            res.send(results);
        }).catch((err) => {
        console.log(err)} )});
    
    app.get('/nytBusiness',(req,res)=>{
        fetch(nyt_business_url).then(res => res.json())
        .then(json => {
            jsonFiles = json.results;
            results = []
            var j=0;
            for(i=0;i<jsonFiles.length;i++)
            {
                if(j<10)
                {
                    if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                    {
                        results.push(jsonFiles[i]);
                    }
                }
                else
                {
                    break;
                }
                j+=1;
            }
            res.send(results);
        }).catch((err) => {
        console.log(err)} )});
    app.get('/nytTechnology',(req,res)=>{
        fetch(nyt_technology_url).then(res => res.json())
        .then(json => {
            jsonFiles = json.results;
            results = []
            var j=0;
            for(i=0;i<jsonFiles.length;i++)
            {
                if(j<10)
                {
                    if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                    {
                        
                        results.push(jsonFiles[i]);
                    }
                }
                else
                {
                    break;
                }
                j+=1;
            }
            res.send(results);
        }).catch((err) => {
        console.log(err)} )});
    app.get('/nytSports',(req,res)=>{
        fetch(nyt_sports_url).then(res => res.json())
        .then(json => {
            jsonFiles = json.results;
            results = []
            var j=0;
            for(i=0;i<jsonFiles.length;i++)
            {
                if(j<10)
                {
                    if(jsonFiles[i].title && jsonFiles[i].multimedia && jsonFiles[i].section && jsonFiles[i].published_date && jsonFiles[i].abstract)
                    {

                        results.push(jsonFiles[i]);
                    }
                }
                else
                {
                    break;
                }
                j+=1;
            }
            res.send(results);
        }).catch((err) => {
        console.log(err)} )});

app.get('/nytDetailed',(req,res)=>{
    var nyt_detailed_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\""+req.query.id+"\")+&api-key="+nyt_api_key;
    fetch(nyt_detailed_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.response.docs[0];
        res.send(jsonFiles);
    }).catch((err) => {
    console.log(err)} )});

app.get('/nytSearch',(req,res)=>{
    var nyt_search_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+req.query.q+"&api-key="+nyt_api_key;
    fetch(nyt_search_url).then(res => res.json())
    .then(json => {
        jsonFiles = json.response.docs;
        results = []
        var j=0;
        for(i=0;i<jsonFiles.length;i++)
        {
            if(j<5)
            {
                if(jsonFiles[i].multimedia)
                {
                    results.push(jsonFiles[i]);
                }
            }

            else
            {
                break;
            }
            j+=1;
        }
        res.send(results);
    }).catch((err) => {
    console.log(err)} )});

app.listen(PORT);
