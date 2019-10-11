# Sprint Challenge: Node DB Sprint

## Description

In this challenge, you design and build a Data Model and a RESTful API that stores data into a Relational Database.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [X] Create a forked copy of this project.
- [X] Add your _Team Lead_ as collaborator on Github.
- [X] Clone your forked version of the Repository.
- [X] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [X] Implement the project on this Branch, committing changes regularly.
- [X] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [X] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
- [X] Please don't merge your own pull request.
- [X] Add your _Team Lead_ as a Reviewer on the Pull-request
- [X] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [X] Explain the difference between `Relational Databases` and `SQL`.

SQL is a language used with databases where as relational databases are databases that relate to one another ie tables relate to one another within a database.

- [X] Why do tables need a `primary key`?

Table needs need a primary key so that each row is identified uniquely.

- [X] What is the name given to a table column that references the primary key on another table.

Foreign Key.

- [X] What do we need in order to have a _many to many_ relationship between two tables.

In order for a many to many relationship to occur there must be a join table. ie

Table A is many to many with Table C

Table A: Many to one with Table B who is one to many with Table C. Thus from the substitution property, A and C are many to many.


## Minimum Viable Product

Take the steps necessary to complete the project from scratch. Start by initializing your project with a `package.json` and go from there.

Complete the following tasks:

- [ ] Design the data model and use _knex migrations_ to create the database and tables.
- [ ] Build an API with endpoints for:
  - [ ] adding resources.
  - [ ] retrieving a list of resources.
  - [ ] adding projects.
  - [ ] retrieving a list of projects.
  - [ ] adding tasks.
  - [ ] retrieving a list of tasks. **The list of tasks should include the project name and project description**.
- [ ] When returning `project` or `task` information, the `completed` property should be `true` or `false`.

For example, instead of returning a `task` that looks like this:

```js
{
  id: 1,
  name: 'convert to boolean',
  completed: 1 // the database stores a 1 to represent true values on a boolean field
}
```

The API should return:

```js
{
  id: 1,
  name: 'convert to boolean',
  completed: true // write code to convert the 1 to true and 0 to false
}
```

### Business Rules

- a `project` can have multiple `tasks`.
- a `project` can use multiple `resources`.
- a `task` belongs to only one `project`.
- the same `resource` can be used in multiple `projects`.
- when adding `projects` the client must provide a name, the description is optional.
- when adding `resources` the client must provide a name, the description is optional.
- when adding a `task` the client must provide a description, the notes are optional.
- when adding a `task` the client must provide the `id` of an existing project.
- for `projects` and `tasks` if no value is provided for the `completed` property, the API should provide a default value of `false`.

Project:
-uniqueID
-name.required
-description
-completed.boolean.notNull.toDefault(false)
==> MULT tasks
==> MULT resources

//
 1)Add Project
 -post to /projects

 insertProject (project)
 db("projects").insert(project);

 -body will be {
   #id will auto gen
   name:
   description:
   completed: false
 }

 2)Get Projects (ALL)
 -get to /projects

  findProjects (project)
  db("projects");
//  



Task:
-uniqueID
-description.required
-notes
-completed.boolean.notNull.toDefault(false)
==> SINGLE Project
-project_id (references id in project)

//
1) ADD TASKS 

post /tasks
{
  description:
  notes:
  completed: true or false
  project_id:
}

db("tasks").insert(task)

2) GET TASKS (include project name and description)

get /tasks

db("projects").join("tasks", "id", "=", "project_id")

//

Resources:
-uniqueID
-name.required.noDuplicates
-description
==> MULT Project
-project_id (references id in project)

//
1) ADD RESOURCE

post /resources
{
  name:
  description:
  project_id:
}

db("resources").insert(resource);

2) GET RESOURCES

get /resouces

db("resources")

//

projects_resources
-id
-project_id (foreign key references id in project)
-resource_id (foreign key references id is resource)






#Other values don't really matter because they are for only that specific table
Testing:
Project
-id

Task
-id
-project_id (references id in project)

Resources
-id
-project_id (references id in project)

ProjectResource
-project_id (foreign key references id in project)
-resource_id (foreign key references id is resource)


### Entities

A `project` is what needs to be done. We want to store the following data about a `project`:
- [ ] a unique Id.
- [ ] a name. This column is required.
- [ ] a description.
- [ ] a boolean that indicates if the project has been completed. This column cannot be NULL, the default value should be `false`.

A `resource` is anything needed to complete a project, some examples are: a person, a tool, a meeting room or a software license. We want to store the following data about a `resource`:

- [ ] a unique Id.
- [ ] a name. This column is required.
- [ ] a description.

The database should not allow resources with duplicate names.

An `task` one of the steps needed to complete the project. We want to store the following data about an `task`.

- [ ] a unique id.
- [ ] a description of what needs to be done. This column is required.
- [ ] a notes column to add additional information.
- [ ] a boolean that indicates if the task has been completed. This column cannot be NULL, the default value should be `false`.

