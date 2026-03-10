package com.example.API_BOOK.Controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/Book")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class BookController {
    private BookRepository repository;
}
