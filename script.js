$(document).ready(function () {
    const studentList = $('#studentList');
  
    // Function to fetch and display students
    function fetchstudents() {
      $.ajax({
        url: 'http://localhost:3000/api/Student',
        method: 'GET',
        crossDomain: true,
        xhrFields: {
          withCredentials: true,
        },
        dataType: 'json',
        success: function (data) {
          studentList.empty(); // Clear previous list
  
          $.each(data, function (index, student) {
            const listItem = $('<li>').text(`id: ${student.id}, name: ${student.name}, marks: ${student.marks}`);
  
            // Add update and delete buttons
            const updateButton = $('<button>').text('Update').on('click', function () {
              updatestudent(student._id);
            });
  
            const deleteButton = $('<button>').text('Delete').on('click', function () {
              deletestudent(student._id);
            });
  
            listItem.append(updateButton, deleteButton);
            studentList.append(listItem);
          });
        },
        error: function (error) {
          console.error('Error fetching students:', error);
        }
      });
    }
  
    // Initial fetch on page load
    fetchstudents();
  
    // Function to add a new student
    const addstudent = function () {
      const id = $('#id').val();
      const name = $('#name').val();
      const marks = $('#marks').val();
  
      $.ajax({
        url: 'http://localhost:3000/api/Student',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id, name, marks }),
        dataType: 'json',
        success: function (data) {
          console.log('New student added:', data);
          // Fetch and display students again after adding a new student
          fetchstudents();
        },
        error: function (error) {
          console.error('Error adding student:', error);
        }
      });
    }
  
    // Function to update a student
    window.updatestudent = function (studentId) {
      // Assuming you want to show a prompt for the user to enter new data
      const newid = prompt('Enter new id:');
      const newname = prompt('Enter new name:');
      const newmarks = prompt('Enter new marks:');
  
      // Make a PUT request to update the student on the server
      $.ajax({
        url: `http://localhost:3000/api/student/${studentId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ id: newid, name: newname, marks: newmarks }),
        dataType: 'json',
        success: function (data) {
          console.log(`Student with ID ${studentId} updated:`, data);
          // Fetch and display students again after updating a student
          fetchstudents();
        },
        error: function (error) {
          console.error(`Error updating student with ID ${studentId}:`, error);
        }
      });
    }
  
    // Function to delete a student
    window.deletestudent = function (studentId) {
      // Assuming you want to show a confirmation dialog
      const confirmed = confirm('Are you sure you want to delete this student?');
  
      if (confirmed) {
        // Make a DELETE request to remove the student from the server
        $.ajax({
          url: `http://localhost:3000/api/student/${studentId}`,
          method: 'DELETE',
          success: function (data) {
            console.log(`Student with ID ${studentId} deleted:`, data);
            // Fetch and display students again after deleting a student
            fetchstudents();
          },
          error: function (error) {
            console.error(`Error deleting student with ID ${studentId}:`, error);
          }
        });
      }
    }
  });
  