package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void delete(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book update(Long id, Book book) {
        Book existingBook = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Book not found"));
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setGenre(book.getGenre());
        existingBook.setQuantityAvailable(book.getQuantityAvailable());
        existingBook.setPublicationYear(book.getPublicationYear());
        existingBook.setRating(book.getRating());
        return bookRepository.save(existingBook);
    }

    @Override
    public List<Book> searchByTitleOrAuthorOrGenre(String query) {
        return bookRepository.searchByTitleOrAuthorOrGenre(query);
    }

    @Override
    public Page<Book> findAll(int page, int size, String sortField, String sortDirection) {
        Sort sort = Sort.by(sortField);
        if ("desc".equals(sortDirection)) {
            sort = sort.descending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        return bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book rateBook(Long id, double rating) {
        if (rating < 0.1 || rating > 5.0) {
            throw new IllegalArgumentException("Rating value out of bounds: 0.1 - 5");
        }
        Book existingBook = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Book not found"));

        double newRatingTotal = existingBook.getRatingTotal() + rating;
        int newRatingCount = existingBook.getRatingCount() + 1;
        double newRating = BigDecimal.valueOf(newRatingTotal / newRatingCount)
                .setScale(2, RoundingMode.HALF_UP).doubleValue();

        existingBook.setRating(newRating);
        existingBook.setRatingCount(newRatingCount);
        existingBook.setRatingTotal(newRatingTotal);
        return bookRepository.save(existingBook);
    }
}
