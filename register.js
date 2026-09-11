const REGISTRATION_API_URL = 'https://ballia-rozgar-sewa-ylnyqfvs7a-em.a.run.app/api/registration/submit';

function getEventParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        eventCity: (params.get('event_city') || '').trim().toLowerCase(),
        eventKey: (params.get('event_key') || '').trim().toLowerCase()
    };
}

function setStatus(message, type) {
    const status = document.getElementById('formStatus');
    status.textContent = message;
    status.className = `form-status ${type}`;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(function(error) {
        error.textContent = '';
    });
}

function setFieldError(fieldName, message) {
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (error) {
        error.textContent = message;
    }
}

function formatCityName(city) {
    return city ? city.charAt(0).toUpperCase() + city.slice(1) : city;
}

function validateForm(form, eventParams) {
    clearErrors();
    let isValid = true;

    if (!eventParams.eventCity || !eventParams.eventKey) {
        setStatus('This registration link is missing event details. Please scan the event QR code again.', 'error');
        return false;
    }

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            setFieldError(field.name, 'This field is required.');
            isValid = false;
        }
    });

    const phone = form.elements.phone.value.replace(/\D/g, '');
    if (phone && !/^\d{10}$/.test(phone)) {
        setFieldError('phone', 'Enter a valid 10-digit phone number.');
        isValid = false;
    }

    const dateOfBirth = form.elements.date_of_birth.value;
    if (dateOfBirth && new Date(`${dateOfBirth}T00:00:00`) > new Date()) {
        setFieldError('date_of_birth', 'Date of birth cannot be in the future.');
        isValid = false;
    }

    const years = Number(form.elements.experience_years.value);
    const months = Number(form.elements.experience_months.value);
    if (!Number.isInteger(years) || years < 0 || years > 60) {
        setFieldError('experience_years', 'Enter years from 0 to 60.');
        isValid = false;
    }
    if (!Number.isInteger(months) || months < 0 || months > 11) {
        setFieldError('experience_months', 'Enter months from 0 to 11.');
        isValid = false;
    }

    if (!isValid) {
        setStatus('Please check the highlighted fields and try again.', 'error');
    }

    return isValid;
}

async function submitRegistration(form, eventParams) {
    const submitButton = document.getElementById('submitButton');
    const payload = {
        event_city: eventParams.eventCity,
        event_key: eventParams.eventKey,
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.replace(/\D/g, ''),
        gender: form.elements.gender.value,
        date_of_birth: form.elements.date_of_birth.value,
        area: form.elements.area.value.trim(),
        city: form.elements.city.value.trim(),
        highest_qualification: form.elements.highest_qualification.value.trim(),
        experience_years: Number(form.elements.experience_years.value),
        experience_months: Number(form.elements.experience_months.value)
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    setStatus('Submitting your registration...', 'success');

    if (window.location.protocol === 'file:') {
        setStatus('Registration must be submitted from the production website. Please open https://bharatrojgarsewa.com/register.html with your event QR link.', 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Register and mark attendance';
        return;
    }

    try {
        const response = await fetch(REGISTRATION_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const responseBody = await response.json().catch(function() {
            return {};
        });

        if (!response.ok) {
            throw new Error(responseBody.message || responseBody.error || 'Registration could not be completed. Please try again.');
        }

        const successUrl = new URL('registration-success.html', window.location.href);
        successUrl.searchParams.set('event_city', eventParams.eventCity);
        successUrl.searchParams.set('event_key', eventParams.eventKey);
        window.location.assign(successUrl.href);
    } catch (error) {
        setStatus(error.message, 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Register and mark attendance';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const eventSummary = document.getElementById('eventSummary');
    const eventParams = getEventParams();

    form.elements.event_city.value = eventParams.eventCity;
    form.elements.event_key.value = eventParams.eventKey;

    if (eventParams.eventCity && eventParams.eventKey) {
        eventSummary.textContent = `भारत रोजगार महोत्सव | ${formatCityName(eventParams.eventCity)} संस्करण`;
        eventSummary.hidden = false;
    } else {
        setStatus('This registration link is missing event details. Please scan the event QR code again.', 'error');
        document.getElementById('submitButton').disabled = true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(form, eventParams)) {
            submitRegistration(form, eventParams);
        }
    });
});
