package com.example.api.demoapi.dao;

import com.example.api.demoapi.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleDao extends JpaRepository<Article, Integer> {
    Optional<Article> findByTitle(String title);
    Optional<Article> findByTitleAndIdNot(String title , int id);
    Optional<List<Article>> findByTitleContainingOrContentContaining(String title, String content);
}
