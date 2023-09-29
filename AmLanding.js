
document.addEventListener("DOMContentLoaded", function () {
    //Simulate the search of an user on a database
    const userList = [
        {
          uid: '001',
          email: 'user1@example.com',
          address: '123 Main St, City1, Country1'
        },
        {
          uid: '002',
          email: 'user2@example.com',
          address: '456 Elm St, City2, Country2'
        },
        {
          uid: '003',
          email: 'user3@example.com',
          address: '789 Oak St, City3, Country3'
        }
      ];
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
        
            const uid = urlParams.get("uid");
            console.log(uid);
            let user=null;
            console.log(user);
            if (uid) {
                user=searchUser(uid);
                if (user) {
                    const emailInput = document.getElementById("email");
                    const addressInput = document.getElementById("address");
                    
                    emailInput.value = user.email;
                    emailInput.readOnly = true;
                    
                    addressInput.value = user.address;
                    addressInput.readOnly = true;
                }
            }
          
            const dateInput = document.getElementById("date");
            // Calculate the date 2 days from the current date
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() );
            const minDate =currentDate.toISOString().split("T")[0];
            currentDate.setDate(currentDate.getDate() + 1);
            const maxDate = currentDate.toISOString().split("T")[0];

            // Set the min attribute of the date input to limit it to 2 days from the current date
            dateInput.setAttribute("min", minDate);
            dateInput.setAttribute("max", maxDate);
            console.log(minDate)
            console.log(maxDate)
        dateInput.onfocus = function (event) {
            this.type = 'date';
            this.focus();
    }

            // Find fields hour and minute in DOM
            const hourInput = document.getElementById("hour");
            const minuteInput = document.getElementById("minute");

            // Populate the hour dropdown with values from 9 to 20 (9:00 AM to 8:00 PM)
            for (let hour = 9; hour <= 21; hour++) {
                const option = document.createElement("option");
                option.value = hour.toString();
                option.textContent = hour.toString().padStart(2, '0');
                hourInput.appendChild(option);
            }

            // Populate the minute dropdown with 15-minute intervals
            for (let minute = 0; minute < 60; minute += 15) {
                const option = document.createElement("option");
                option.value = minute.toString();
                option.textContent = minute.toString().padStart(2, '0');
                minuteInput.appendChild(option);
            }
            

            // Prevent manual input or modification of the date field
            dateInput.addEventListener("keydown", function (e) {
                e.preventDefault();
            });
            // set the minutes to 0 if user selects the last time slot
            hourInput.addEventListener("change",function(e){
                console.log(minute.value.toString);
                if (hourInput.value === "21") {
                    // Set the minute field to 0 if hour is 21
                    minuteInput.value = "0";
                    minuteInput.disabled = true;
                } else {
                    // Remove the read-only attribute if hour is not 21
                    minuteInput.disabled = false;
                }
                
            });
    
    function searchUser(uid){
        // Use Array.find to find the user with a matching UID
        const user = userList.find((user) => user.uid === uid);

        // Return the user entity or null if not found
        return user || null;

    }
     // Capture form data on submit
     const form = document.getElementById("appointment-form");
     form.addEventListener("submit", function (e) {
         e.preventDefault(); // Prevent the default form submission
 
         // Get form data
         const email = document.getElementById("email").value;
         const address = document.getElementById("address").value;
         const date = dateInput.value; // Use the dateInput variable we defined earlier
         const time = hourInput.value +':'+minuteInput.value;
        if(!hourInput.value){
            //Initialize time in case the customer doesnt touch the field
            hourInput.value='9';
            
        }
        if(!minuteInput.value){
            minuteInput.value='0';
        }
         // Now you can use the captured form data as needed, e.g., send it to a server or process it further
         // Hide the form 
         const formBody = document.getElementById("apt-body");
         formBody.style.display = "none";
         const successMessage = document.getElementById("success-message");
         const successEmail = document.getElementById("success-email");

         // Show the success message with animation
         successEmail.textContent = `Email: ${email}`;
         successMessage.classList.add("show");
 
         // Reset the form
         form.reset();
     });
    
    
});






