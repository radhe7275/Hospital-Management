/* =====================================
   HOSPITAL MANAGEMENT SYSTEM
   Front-End JavaScript
===================================== */


/* =====================================
   PATIENT MANAGEMENT
===================================== */

let patients = JSON.parse(localStorage.getItem("patients")) || [];

const patientForm = document.getElementById("patientForm");

if (patientForm) {

  patientForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const patient = {

      id: document.getElementById("patientId").value,
      name: document.getElementById("patientName").value,
      age: document.getElementById("patientAge").value,
      gender: document.getElementById("patientGender").value,
      blood: document.getElementById("bloodGroup").value,
      phone: document.getElementById("patientPhone").value,
      email: document.getElementById("patientEmail").value,
      address: document.getElementById("patientAddress").value,
      disease: document.getElementById("patientDisease").value

    };

    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    showMessage(
      "patientMessage",
      "Patient added successfully!",
      "success"
    );

    patientForm.reset();

    displayPatients();

    updateDashboard();

  });

}


/* Display Patients */

function displayPatients() {

  const table = document.getElementById("patientTable");

  if (!table) return;

  table.innerHTML = "";

  patients.forEach((patient, index) => {

    table.innerHTML += `

      <tr>

        <td>${patient.id}</td>

        <td>${patient.name}</td>

        <td>${patient.age}</td>

        <td>${patient.gender}</td>

        <td>${patient.blood}</td>

        <td>${patient.phone}</td>

        <td>${patient.disease}</td>

        <td>

          <button
            class="btn btn-sm btn-danger"
            onclick="deletePatient(${index})">
            <i class="bi bi-trash"></i>
          </button>

        </td>

      </tr>

    `;

  });

}


/* Delete Patient */

function deletePatient(index) {

  if (confirm("Are you sure you want to delete this patient?")) {

    patients.splice(index, 1);

    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );

    displayPatients();

    updateDashboard();

  }

}


/* Patient Search */

const patientSearch = document.getElementById("patientSearch");

if (patientSearch) {

  patientSearch.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const rows = document.querySelectorAll("#patientTable tr");

    rows.forEach(row => {

      row.style.display =
        row.innerText.toLowerCase().includes(search)
          ? ""
          : "none";

    });

  });

}


/* =====================================
   APPOINTMENT MANAGEMENT
===================================== */

let appointments =
  JSON.parse(localStorage.getItem("appointments")) || [];


const appointmentForm =
  document.getElementById("appointmentForm");


if (appointmentForm) {

  appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const appointment = {

      patient:
        document.getElementById("appointmentPatient").value,

      doctor:
        document.getElementById("appointmentDoctor").value,

      department:
        document.getElementById("appointmentDepartment").value,

      date:
        document.getElementById("appointmentDate").value,

      time:
        document.getElementById("appointmentTime").value,

      reason:
        document.getElementById("appointmentReason").value,

      status: "Confirmed"

    };

    appointments.push(appointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    showMessage(
      "appointmentMessage",
      "Appointment booked successfully!",
      "success"
    );

    appointmentForm.reset();

    displayAppointments();

    updateDashboard();

  });

}


/* Display Appointments */

function displayAppointments() {

  const table =
    document.getElementById("appointmentTable");

  if (!table) return;

  table.innerHTML = "";

  appointments.forEach((appointment, index) => {

    table.innerHTML += `

      <tr>

        <td>${appointment.patient}</td>

        <td>${appointment.doctor}</td>

        <td>${appointment.department}</td>

        <td>${appointment.date}</td>

        <td>${appointment.time}</td>

        <td>
          <span class="badge bg-success">
            ${appointment.status}
          </span>
        </td>

        <td>

          <button
            class="btn btn-sm btn-danger"
            onclick="deleteAppointment(${index})">

            <i class="bi bi-trash"></i>

          </button>

        </td>

      </tr>

    `;

  });

}


/* Delete Appointment */

function deleteAppointment(index) {

  if (confirm("Cancel this appointment?")) {

    appointments.splice(index, 1);

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    displayAppointments();

    updateDashboard();

  }

}


/* =====================================
   BILLING
===================================== */

function calculateBill() {

  const consultation =
    Number(document.getElementById("consultation").value) || 0;

  const medicine =
    Number(document.getElementById("medicine").value) || 0;

  const room =
    Number(document.getElementById("room").value) || 0;

  const other =
    Number(document.getElementById("other").value) || 0;

  const total =
    consultation +
    medicine +
    room +
    other;

  document.getElementById("totalBill").innerText = total;

}


/* =====================================
   REGISTER
===================================== */

const registerForm =
  document.getElementById("registerForm");


if (registerForm) {

  registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
      document.getElementById("registerName").value;

    const email =
      document.getElementById("registerEmail").value;

    const password =
      document.getElementById("registerPassword").value;

    const confirmPassword =
      document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

      showMessage(
        "registerMessage",
        "Passwords do not match!",
        "danger"
      );

      return;

    }


    const user = {
      name,
      email,
      password
    };


    localStorage.setItem(
      "hospitalUser",
      JSON.stringify(user)
    );


    showMessage(
      "registerMessage",
      "Registration successful! Redirecting to login...",
      "success"
    );


    setTimeout(() => {

      window.location.href = "login.html";

    }, 1500);

  });

}


/* =====================================
   LOGIN
===================================== */

const loginForm =
  document.getElementById("loginForm");


if (loginForm) {

  loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
      document.getElementById("loginEmail").value;

    const password =
      document.getElementById("loginPassword").value;


    const user =
      JSON.parse(localStorage.getItem("hospitalUser"));


    if (
      user &&
      user.email === email &&
      user.password === password
    ) {

      showMessage(
        "loginMessage",
        "Login successful!",
        "success"
      );


      setTimeout(() => {

        window.location.href = "dashboard.html";

      }, 1000);


    } else {

      showMessage(
        "loginMessage",
        "Invalid email or password.",
        "danger"
      );

    }

  });

}


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Your message has been submitted successfully!");

    contactForm.reset();

  });

}


/* =====================================
   DASHBOARD
===================================== */

function updateDashboard() {

  const totalPatients =
    document.getElementById("totalPatients");

  const totalAppointments =
    document.getElementById("totalAppointments");


  if (totalPatients) {

    totalPatients.innerText =
      patients.length;

  }


  if (totalAppointments) {

    totalAppointments.innerText =
      appointments.length;

  }


  const dashboardTable =
    document.getElementById("dashboardAppointments");


  if (dashboardTable) {

    dashboardTable.innerHTML = "";

    appointments.slice(-5).reverse().forEach(a => {

      dashboardTable.innerHTML += `

        <tr>

          <td>${a.patient}</td>

          <td>${a.doctor}</td>

          <td>${a.date}</td>

          <td>
            <span class="badge bg-success">
              ${a.status}
            </span>
          </td>

        </tr>

      `;

    });

  }

}


/* =====================================
   MESSAGE FUNCTION
===================================== */

function showMessage(
  elementId,
  message,
  type
) {

  const element =
    document.getElementById(elementId);

  if (!element) return;

  element.innerHTML = `

    <div class="alert alert-${type}">
      ${message}
    </div>

  `;

}


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    displayPatients();

    displayAppointments();

    updateDashboard();

  }
);