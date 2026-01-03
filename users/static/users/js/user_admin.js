document.addEventListener('DOMContentLoaded', function() {
    let roleSelect = document.getElementById('id_role');
    let agencyField = document.querySelector('.form-row.field-agency');
    let nidField = document.querySelector('.form-row.field-nid');
    let dobField = document.querySelector('.form-row.field-dob');
    let citizenIdField = document.querySelector('.form-row.field-citizen_id');
    let phoneField = document.querySelector('.form-row.field-phone');

    function toggleFields() {
        if (roleSelect.value === 'citizen') {
            // Show citizen fields, hide agency
            agencyField.style.display = 'none';
            nidField.style.display = '';
            dobField.style.display = '';
            citizenIdField.style.display = '';
            phoneField.style.display = '';
        } else if (roleSelect.value === 'gov_admin') {
            // Show agency, hide citizen fields
            agencyField.style.display = '';
            nidField.style.display = 'none';
            dobField.style.display = 'none';
            citizenIdField.style.display = 'none';
            phoneField.style.display = 'none';
        }
    }

    roleSelect.addEventListener('change', toggleFields);
    toggleFields(); // initial toggle
});
