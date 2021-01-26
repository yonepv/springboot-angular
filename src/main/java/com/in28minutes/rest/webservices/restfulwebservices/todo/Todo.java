package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Todo {

	private long id;
	
	private String username;
	
	private String description;
	
	private Date targetDate;
	
	private boolean isDone;
}
