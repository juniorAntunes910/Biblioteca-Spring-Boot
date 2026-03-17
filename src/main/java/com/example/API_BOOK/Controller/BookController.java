package com.example.API_BOOK.Controller;

import com.example.API_BOOK.Entity.Book;
import com.example.API_BOOK.Repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@RestController
@RequestMapping("/Book")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> listarTodos(){
        return bookRepository.findAll();
    }

    @PostMapping
    public Book salvar(@RequestBody Book book){
        return bookRepository.save(book);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Book> alternarStatus(@PathVariable Long id){
        return bookRepository.findById(id).map(book -> {
            book.setAvaiable(!book.isAvaiable());
            Book atualizado = bookRepository.save(book);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{title}/{new-title}/title")
    public ResponseEntity<Book> alternarNome(@PathVariable String nome, @PathVariable String novoNome){
        return bookRepository.findByTitulo(nome).map(book -> {
            book.setTitle(novoNome);
            Book atualizado = bookRepository.save(book);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }
}
