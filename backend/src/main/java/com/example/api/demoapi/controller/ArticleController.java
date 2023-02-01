package com.example.api.demoapi.controller;

import com.example.api.demoapi.dao.ArticleDao;
import com.example.api.demoapi.model.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ArticleController {

    @Autowired
    private ArticleDao articleDao;

    @GetMapping("/article")
    public List<Article> getListArticle(){
        return articleDao.findAll();
    }

    @GetMapping("/article/{id}")
    public Article getArticleById(@PathVariable int id){
        return articleDao.findById(id).get();
    }

    @GetMapping("/article-by-searchTerm/{searchTerm}")
    public List<Article> getListArticle( @PathVariable String searchTerm ){
        return articleDao.findByTitleContainingOrContentContaining(searchTerm,searchTerm).orElse(null);
    }

    @PostMapping("/article")
    public ResponseEntity<Article> addArticle(@RequestBody Article article){
        Optional<Article> articleBdd = articleDao.findByTitle(article.getTitle());

        //Un article porte déjà ce nom
        if(articleBdd.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        articleDao.save(article);
        return new ResponseEntity<>(article,HttpStatus.CREATED);
    }

    @PutMapping("/article/{id}")
    public ResponseEntity<Article> editArticle(@RequestBody Article article){

        Optional<Article> articleBdd = articleDao.findById(article.getId());

        if(articleBdd.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Article> articleDoublon = articleDao.findByTitleAndIdNot(
                article.getTitle(),
                article.getId()
        );
        if(articleDoublon.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        articleDao.save(article);
        return new ResponseEntity<>(article,HttpStatus.OK);
    }


    @DeleteMapping("/article/{id}")
    public ResponseEntity<Article> suppressionArticle(@PathVariable int id) {

        Optional<Article> articleBdd = articleDao.findById(id);

        if(articleBdd.isPresent()) {
            articleDao.deleteById(id);
            return new ResponseEntity<>(articleBdd.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
