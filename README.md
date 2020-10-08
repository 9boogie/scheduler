# Interview Scheduler

Interview Scheduler is a simple, single-page application, built using React.
Single Page Interview Scheduler with following behaviours:
  - User can switch the days to find empty slot for interview or see booked interviews
  - Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers
  - User can edit the detail of existing interview, or can cancel the existing interview
  - A user is shown an error if an interview cannot be saved or deleted
  - A user is shown a status indicator while asynchronous operations are in progress

## Final Product
!["Screenshot of Main Page(DeskTop Ver)"](https://github.com/9boogie/scheduler/blob/master/docs/Main_Page.png)
!["Screenshot of Booking Interview"](https://github.com/9boogie/scheduler/blob/master/docs/Booking_Interview.png)
!["Screenshot of Edit/Delete interview"](https://github.com/9boogie/scheduler/blob/master/docs/Edit_Delete_Interview.png)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8000/>.
4. Go to <http://localhost:8000/> in your browser.

## Dependencies

- Axios
- @testing-library/react-hooks
- react-test-renderer

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
