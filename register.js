const REGISTRATION_API_URL = 'https://ballia-rozgar-sewa-ylnyqfvs7a-em.a.run.app/api/registration/submit';
let currentLanguage = 'en';

const translations = {
    en: {
        back: '&larr; Bharat Rojgar Sewa home',
        eyebrow: 'Bharat Rojgar Mahotsav',
        title: 'Candidate registration',
        subtitle: 'Register for the employment event. Your attendance will be marked after successful submission.',
        name: 'Full name',
        phone: 'Phone number',
        gender: 'Gender',
        dateOfBirth: 'Date of birth',
        area: 'Area',
        city: 'City',
        qualification: 'Highest qualification',
        experienceYears: 'Experience years',
        experienceMonths: 'Experience months',
        genderPlaceholder: 'Select gender',
        qualificationPlaceholder: 'Select highest qualification',
        genderMale: 'Male',
        genderFemale: 'Female',
        genderOther: 'Other',
        qualificationBelow10: 'Below 10th',
        qualification10th: '10th Standard / SSLC',
        qualification12th: '12th Standard / PUC',
        qualificationDiploma: 'Diploma',
        qualificationIti: 'ITI',
        qualificationGraduation: 'Graduation',
        qualificationPostgraduation: 'Post Graduation',
        qualificationOthers: 'Others',
        submit: 'Register and mark attendance',
        submitting: 'Submitting...',
        required: 'This field is required.',
        invalidPhone: 'Enter a valid 10-digit phone number.',
        futureDate: 'Date of birth cannot be in the future.',
        underAge: 'Candidate must be at least 18 years old.',
        invalidYears: 'Enter years from 0 to 60.',
        invalidMonths: 'Enter months from 0 to 11.',
        checkFields: 'Please check the highlighted fields and try again.',
        missingEvent: 'This registration link is missing event details. Please scan the event QR code again.',
        submittingMessage: 'Submitting your registration...',
        localMessage: 'Registration must be submitted from the production website. Please open https://bharatrojgarsewa.com/register.html with your event QR link.',
        apiError: 'Registration could not be completed. Please try again.',
        eventSummary: 'Bharat Rojgar Mahotsav | {city} Edition'
    },
    hi: {
        back: '&larr; Bharat Rojgar Sewa होम',
        eyebrow: 'भारत रोजगार महोत्सव',
        title: 'उम्मीदवार पंजीकरण',
        subtitle: 'रोजगार कार्यक्रम के लिए पंजीकरण करें। सफल पंजीकरण के बाद आपकी उपस्थिति दर्ज की जाएगी।',
        name: 'पूरा नाम',
        phone: 'फोन नंबर',
        gender: 'लिंग',
        dateOfBirth: 'जन्म तिथि',
        area: 'क्षेत्र',
        city: 'शहर',
        qualification: 'उच्चतम योग्यता',
        experienceYears: 'अनुभव (वर्ष)',
        experienceMonths: 'अनुभव (महीने)',
        genderPlaceholder: 'लिंग चुनें',
        qualificationPlaceholder: 'उच्चतम योग्यता चुनें',
        genderMale: 'पुरुष',
        genderFemale: 'महिला',
        genderOther: 'अन्य',
        qualificationBelow10: '10वीं से कम',
        qualification10th: '10वीं मानक / SSLC',
        qualification12th: '12वीं मानक / PUC',
        qualificationDiploma: 'डिप्लोमा',
        qualificationIti: 'ITI',
        qualificationGraduation: 'स्नातक',
        qualificationPostgraduation: 'स्नातकोत्तर',
        qualificationOthers: 'अन्य',
        submit: 'पंजीकरण करें और उपस्थिति दर्ज करें',
        submitting: 'जमा हो रहा है...',
        required: 'यह फ़ील्ड आवश्यक है।',
        invalidPhone: '10 अंकों का सही फोन नंबर दर्ज करें।',
        futureDate: 'जन्म तिथि भविष्य की नहीं हो सकती।',
        underAge: 'उम्मीदवार की आयु कम से कम 18 वर्ष होनी चाहिए।',
        invalidYears: '0 से 60 के बीच वर्ष दर्ज करें।',
        invalidMonths: '0 से 11 के बीच महीने दर्ज करें।',
        checkFields: 'कृपया चिह्नित फ़ील्ड जांचकर दोबारा प्रयास करें।',
        missingEvent: 'इस पंजीकरण लिंक में कार्यक्रम की जानकारी नहीं है। कृपया कार्यक्रम का QR कोड दोबारा स्कैन करें।',
        submittingMessage: 'आपका पंजीकरण जमा हो रहा है...',
        localMessage: 'पंजीकरण केवल लाइव वेबसाइट से किया जा सकता है। कृपया अपने कार्यक्रम के QR लिंक से https://bharatrojgarsewa.com/register.html खोलें।',
        apiError: 'पंजीकरण पूरा नहीं हो सका। कृपया दोबारा प्रयास करें।',
        eventSummary: 'भारत रोजगार महोत्सव | {city} संस्करण'
    }
};

function getText(key) {
    return translations[currentLanguage][key];
}

function setLanguage(language) {
    currentLanguage = translations[language] ? language : 'en';
    const text = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = currentLanguage === 'hi' ? 'भारत रोजगार महोत्सव पंजीकरण | Bharat Rojgar Sewa' : 'Bharat Rojgar Mahotsav Registration | Bharat Rojgar Sewa';

    document.querySelectorAll('[data-i18n]').forEach(function(node) {
        const key = node.dataset.i18n;
        node.innerHTML = `${text[key]}${node.tagName === 'LABEL' ? ' <span class="required">*</span>' : ''}`;
    });
    document.querySelector('[data-option="gender-placeholder"]').textContent = text.genderPlaceholder;
    document.querySelector('[data-option="qualification-placeholder"]').textContent = text.qualificationPlaceholder;
    document.querySelectorAll('[data-option]').forEach(function(option) {
        const key = option.dataset.option.replace(/-([a-z])/g, function(_, letter) {
            return letter.toUpperCase();
        });
        if (text[key]) {
            option.textContent = text[key];
        }
    });
    document.querySelectorAll('.language-button').forEach(function(button) {
        button.classList.toggle('active', button.dataset.language === currentLanguage);
    });

    const eventSummary = document.getElementById('eventSummary');
    const eventParams = getEventParams();
    if (eventParams.eventCity && !eventSummary.hidden) {
        eventSummary.textContent = text.eventSummary.replace('{city}', formatCityName(eventParams.eventCity));
    }
}

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

function setDateOfBirthLimit() {
    const today = new Date();
    const latestBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const year = latestBirthDate.getFullYear();
    const month = String(latestBirthDate.getMonth() + 1).padStart(2, '0');
    const day = String(latestBirthDate.getDate()).padStart(2, '0');
    document.getElementById('dateOfBirth').max = `${year}-${month}-${day}`;
}

function validateForm(form, eventParams) {
    clearErrors();
    let isValid = true;

    if (!eventParams.eventCity || !eventParams.eventKey) {
        setStatus(getText('missingEvent'), 'error');
        return false;
    }

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            setFieldError(field.name, getText('required'));
            isValid = false;
        }
    });

    const phone = form.elements.phone.value.replace(/\D/g, '');
    if (phone && !/^\d{10}$/.test(phone)) {
        setFieldError('phone', getText('invalidPhone'));
        isValid = false;
    }

    const dateOfBirth = form.elements.date_of_birth.value;
    if (dateOfBirth) {
        const birthDate = new Date(`${dateOfBirth}T00:00:00`);
        const today = new Date();
        const latestBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (birthDate > today) {
            setFieldError('date_of_birth', getText('futureDate'));
            isValid = false;
        } else if (birthDate > latestBirthDate) {
            setFieldError('date_of_birth', getText('underAge'));
            isValid = false;
        }
    }

    const years = Number(form.elements.experience_years.value);
    const months = Number(form.elements.experience_months.value);
    if (!Number.isInteger(years) || years < 0 || years > 60) {
        setFieldError('experience_years', getText('invalidYears'));
        isValid = false;
    }
    if (!Number.isInteger(months) || months < 0 || months > 11) {
        setFieldError('experience_months', getText('invalidMonths'));
        isValid = false;
    }

    if (!isValid) {
        setStatus(getText('checkFields'), 'error');
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
    submitButton.textContent = getText('submitting');
    setStatus(getText('submittingMessage'), 'success');

    if (window.location.protocol === 'file:') {
        setStatus(getText('localMessage'), 'error');
        submitButton.disabled = false;
        submitButton.textContent = getText('submit');
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
            throw new Error(responseBody.message || responseBody.error || getText('apiError'));
        }

        const successUrl = new URL('registration-success.html', window.location.href);
        successUrl.searchParams.set('event_city', eventParams.eventCity);
        successUrl.searchParams.set('event_key', eventParams.eventKey);
        window.location.assign(successUrl.href);
    } catch (error) {
        setStatus(error.message, 'error');
        submitButton.disabled = false;
        submitButton.textContent = getText('submit');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const eventSummary = document.getElementById('eventSummary');
    const eventParams = getEventParams();

    setDateOfBirthLimit();

    form.elements.event_city.value = eventParams.eventCity;
    form.elements.event_key.value = eventParams.eventKey;

    if (eventParams.eventCity && eventParams.eventKey) {
        eventSummary.textContent = getText('eventSummary').replace('{city}', formatCityName(eventParams.eventCity));
        eventSummary.hidden = false;
    } else {
        setStatus(getText('missingEvent'), 'error');
        document.getElementById('submitButton').disabled = true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(form, eventParams)) {
            submitRegistration(form, eventParams);
        }
    });

    document.querySelectorAll('.language-button').forEach(function(button) {
        button.addEventListener('click', function() {
            setLanguage(button.dataset.language);
        });
    });

    setLanguage('en');
});
