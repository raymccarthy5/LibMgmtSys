package com.x00179223.librarybackend.repository;

import com.x00179223.librarybackend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE lower(concat(b.title, ' ', b.author, ' ', b.genre)) LIKE lower(concat('%', :query, '%'))")
    List<Book> searchByTitleOrAuthorOrGenre(@Param("query") String query);
}
