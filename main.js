// class App {
//   constructor(gradeTable, pageHeader, gradeForm) {
//     this.gradeTable = gradeTable;
//     this.pageHeader = pageHeader;
//     this.gradeForm = gradeForm;
//     this.handleGetGradesError = this.handleGetGradesError.bind(this);
//     this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
//     this.createGrade = this.createGrade.bind(this);
//     this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
//     this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
//     this.deleteGrade = this.deleteGrade.bind(this);
//     this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
//     this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);

//   }

//   handleGetGradesError(error) {
//     console.error(error);
//   }

//   handleGetGradesSuccess(grades) {
//     this.gradeTable.updateGrades(grades);
//     var total = 0;
//     for (var i = 0; i < grades.length; i++) {
//       total += grades[i].grade
//     }
//     var average = total / grades.length;
//     this.pageHeader.updateAverage(average);
//   }

//   getGrades() {
//     $.ajax({
//       method: "GET",
//       url: "https://sgt.lfzprototypes.com/api/grades",
//       headers: { "X-Access-Token": "QoYrtKFL" },
//       success: this.handleGetGradesSuccess,
//       error: this.handleGetGradesError
//     })
//   }

//   start() {
//     this.getGrades();
//     this.gradeForm.onSubmit(this.createGrade);
//     this.gradeTable.onDeleteClick(this.deleteGrade);
//   }


//   createGrade(name, course, grade) {
//     console.log(name, course, grade);

//     $.ajax({
//       method: "POST",
//       url: "https://sgt.lfzprototypes.com/api/grades",
//       data: { "name": name, "course": course, "grade": grade },
//       headers: { "X-Access-Token": "QoYrtKFL" },
//       success: this.handleCreateGradeSuccess,
//       error: this.handleCreateGradeError
//     })


//   }

//   handleCreateGradeError(error) {
//     console.error(error);
//   }

//   handleCreateGradeSuccess() {
//     this.getGrades();
//   }

//   deleteGrade(id) {
//     console.log(id)

//     $.ajax({
//       method: "DELETE",
//       url: "https://sgt.lfzprototypes.com/api/grades/" + id,
//       // data: { "name": name, "course": course, "grade": grade },
//       headers: { "X-Access-Token": "QoYrtKFL" },
//       success: this.handleDeleteGradeSuccess,
//       error: this.handleDeleteGradeError
//     })

//   }

//   handleDeleteGradeError(error) {
//     console.error(error);
//   }

//   handleDeleteGradeSuccess() {
//     this.getGrades();
//   }
// }

// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf


$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // var e = document.getElementById("events");
    // e.innerHTML = json.page.totalElements + " events found.";
    showEvents(json);
    // initMap(position, json);
  },
  // success: function (json) {
  //   console.log(json);
  //   // Parse the response.
  //   // Do other things.
  // },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  }
});


function showEvents(json) {
  for (var i = 0; i < json.page.size; i++) {
    $("body").append("<p>" + json._embedded.events[i].name + "</p>");
    $("body").append("<p>" + json._embedded.events[i].locale + "</p>");
    $("body").append("<p>" + json._embedded.events[i].images[0].url + "</p>");
    // $("body").append("<p>" + json._embedded.events[i].priceRanges[0].min + "</p>");
    // $("body").append("<p>" + json._embedded.events[i].priceRanges[0].max + "</p>");
    $("body").append("<p>" + json._embedded.events[i].dates.start.localDate + "</p>");
    $("body").append("<p>" + json._embedded.events[i].dates.start.localTime + "</p>");
    $("body").append("<p>" + json._embedded.events[i]._embedded.venues[0].name + "</p>");
  }
}



// $.ajax({
//   type: "GET",
//   url: "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=ULaPAoWQUZyaEgtZCF9E39G7bEf00flf",
//   async: true,
//   dataType: "json",
//   success: function (json) {
//     console.log(json);
//     // Parse the response.
//     // Do other things.
//   },
//   error: function (xhr, status, err) {
//     // This time, we do not end up here!
//   }
// });





// renderEventRow(json){

//   var table = this.tableElement.querySelector('tbody');

//   var tr = document.createElement('tr');
//   var name = document.createElement('td');
//   name.textContent = data.name;

//   var course = document.createElement('td');
//   course.textContent = data.course;

//   var grade = document.createElement('td');
//   grade.textContent = data.grade;

//   var td = document.createElement('td');
//   var deleteButton = document.createElement('button');
//   deleteButton.textContent = "Delete";
//   deleteButton.className += "btn btn-danger";

//   deleteButton.addEventListener('click', function () {
//     deleteGrade(data.id);
//   });


//   td.appendChild(deleteButton);
//   tr.appendChild(name);
//   tr.appendChild(course);
//   tr.appendChild(grade);
//   tr.appendChild(td);
//   table.appendChild(tr);
//   return tr;

// }

//     }
