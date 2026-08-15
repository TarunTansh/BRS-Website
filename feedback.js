(function () {
    const apiUrl = window.MAHOTSAV_FEEDBACK_API_URL || 'https://ballia-rozgar-sewa-ylnyqfvs7a-em.a.run.app/api/feedback/submit';
    const form = document.getElementById('mahotsavFeedbackForm');
    const formStatus = document.getElementById('formStatus');
    const params = new URLSearchParams(window.location.search || '');
    const langButtons = document.querySelectorAll('.lang-btn');
    const texts = {
        hi: {
            title: 'भारत रोजगार महोत्सव फीडबैक',
            subtitle: 'आपकी राय हमें भविष्य के रोजगार महोत्सव और उम्मीदवार अनुभव को बेहतर बनाने में मदद करेगी।',
            back: '← होम पर वापस',
            submit: 'फीडबैक जमा करें',
            success: 'आपके बहुमूल्य फीडबैक के लिए धन्यवाद। आपका सुझाव Bharat Rojgar Sewa को बेहतर बनाने में मदद करेगा।',
            selectCity: 'शहर चुनें',
            cityLabel: 'इवेंट शहर',
            dateLabel: 'इवेंट तिथि',
            phoneLabel: 'फ़ोन नंबर',
            suggestionLabel: 'एक सुझाव बताइए — हम क्या बेहतर कर सकते हैं?',
            suggestionPlaceholder: 'अपना सुझाव साझा करें...',
            cityError: 'कृपया इवेंट शहर चुनें।',
            dateError: 'कृपया इवेंट तिथि चुनें।',
            phoneError: 'कृपया सही फोन नंबर दर्ज करें।',
            optionError: 'कृपया एक विकल्प चुनें।',
            jobQuestion: 'क्या आपको अच्छे नौकरी के अवसर मिले?',
            recommendQuestion: 'क्या आप अपने दोस्तों को महोत्सव के बारे में बताएँगे?',
            cityOptions: { lucknow: 'लखनऊ', patna: 'पटना', ballia: 'बलिया' }
        },
        en: {
            title: 'Bharat Rojgar Mahotsav Feedback',
            subtitle: 'Your feedback helps us improve future hiring events and candidate experience.',
            back: '← Back to Home',
            submit: 'Submit Feedback',
            success: 'Thank you for your valuable feedback. Your suggestion will help improve Bharat Rojgar Sewa.',
            selectCity: 'Select city',
            cityLabel: 'Event City',
            dateLabel: 'Event Date',
            phoneLabel: 'Phone Number',
            suggestionLabel: 'What is one suggestion for us to improve?',
            suggestionPlaceholder: 'Share one suggestion to help us improve...',
            cityError: 'Please select the event city.',
            dateError: 'Please choose the event date.',
            phoneError: 'Please enter a valid phone number.',
            optionError: 'Please choose an option.',
            jobQuestion: 'Did you get good job opportunities?',
            recommendQuestion: 'Will you recommend this event to your friends?',
            cityOptions: { lucknow: 'Lucknow', patna: 'Patna', ballia: 'Ballia' }
        }
    };

    let currentLang = 'hi';

    function setLanguage(lang) {
        currentLang = lang;
        const t = texts[lang] || texts.hi;

        document.documentElement.lang = lang;
        document.title = lang === 'hi' ? 'भारत रोजगार महोत्सव फीडबैक | Bharat Rojgar Mahotsav' : 'Bharat Rojgar Mahotsav Feedback';

        const titleNode = document.querySelector('.feedback-header h1');
        const subtitleNode = document.querySelector('.feedback-header .subtitle');
        const backNode = document.querySelector('.back-link');
        const submitNode = document.querySelector('.submit-btn');
        const cityLabelNode = document.querySelector('label[for="event_city"]');
        const dateLabelNode = document.querySelector('label[for="event_date"]');
        const phoneLabelNode = document.querySelector('label[for="phone"]');
        const suggestionLabelNode = document.querySelector('label[for="suggestion"]');
        const cityOptionNode = document.querySelector('#event_city option[value=""]');
        const suggestionNode = document.getElementById('suggestion');
        const jobQuestionNode = document.getElementById('jobOpportunityQuestion');
        const recommendQuestionNode = document.getElementById('recommendQuestion');

        if (titleNode) titleNode.textContent = t.title;
        if (subtitleNode) subtitleNode.textContent = t.subtitle;
        if (backNode) backNode.textContent = t.back;
        if (submitNode) submitNode.textContent = t.submit;
        if (cityLabelNode) cityLabelNode.innerHTML = t.cityLabel + ' <span class="required">*</span>';
        if (dateLabelNode) dateLabelNode.innerHTML = t.dateLabel + ' <span class="required">*</span>';
        if (phoneLabelNode) phoneLabelNode.innerHTML = t.phoneLabel + ' <span class="required">*</span>';
        if (suggestionLabelNode) suggestionLabelNode.innerHTML = t.suggestionLabel;
        if (cityOptionNode) cityOptionNode.textContent = t.selectCity;
        if (suggestionNode) suggestionNode.placeholder = t.suggestionPlaceholder;
        if (jobQuestionNode) jobQuestionNode.innerHTML = t.jobQuestion + ' <span class="required">*</span>';
        if (recommendQuestionNode) recommendQuestionNode.innerHTML = t.recommendQuestion + ' <span class="required">*</span>';

        Object.entries(t.cityOptions).forEach(([value, label]) => {
            const option = document.querySelector('#event_city option[value="' + value + '"]');
            if (option) option.textContent = label;
        });

        const radioLabels = document.querySelectorAll('.emoji-option span:last-child');
        const optionsMap = {
            hi: [
                ['बहुत अच्छा', 'अच्छा', 'सामान्य', 'खराब', 'बहुत खराब'],
                ['बहुत अच्छा', 'अच्छा', 'सामान्य', 'खराब', 'बहुत खराब'],
                ['हाँ', 'कुछ हद तक', 'नहीं'],
                ['हाँ', 'शायद', 'नहीं']
            ],
            en: [
                ['Very Good', 'Good', 'Average', 'Poor', 'Very Poor'],
                ['Very Good', 'Good', 'Average', 'Poor', 'Very Poor'],
                ['Yes', 'Somewhat', 'No'],
                ['Yes', 'Maybe', 'No']
            ]
        };

        const selectedTextValues = optionsMap[lang] || optionsMap.hi;
        const radioGroups = document.querySelectorAll('.emoji-options');
        radioGroups.forEach((group, groupIndex) => {
            const labelSpans = group.querySelectorAll('span:last-child');
            labelSpans.forEach((span, idx) => {
                const values = selectedTextValues[Math.floor(groupIndex / 1)] || [];
                if (values[idx]) span.textContent = values[idx];
            });
        });

        const scoreGroups = document.querySelectorAll('.scale-group legend');
        if (scoreGroups[0]) scoreGroups[0].innerHTML = (lang === 'hi' ? 'महोत्सव का आपका अनुभव कैसा रहा?' : 'How was your Mahotsav experience?') + ' <span class="required">*</span>';
        if (scoreGroups[1]) scoreGroups[1].innerHTML = (lang === 'hi' ? 'इंटरव्यू का अनुभव कैसा रहा?' : 'How was your interview experience?') + ' <span class="required">*</span>';

        langButtons.forEach((button) => {
            button.classList.toggle('active', button.dataset.lang === lang);
        });
    }

    langButtons.forEach((button) => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    setLanguage('hi');

    function getConfiguredApiUrl() {
        if (!apiUrl || apiUrl.includes('your-backend-domain.example.com')) {
            return '';
        }
        return apiUrl;
    }

    function getQueryValue(primaryKey, fallbackKey) {
        return params.get(primaryKey) || params.get(fallbackKey) || '';
    }

    function applyPrefilledValues() {
        const cityValue = getQueryValue('event_city', 'city');
        const dateValue = getQueryValue('event_date', 'date');

        if (cityValue) {
            const normalizedCity = cityValue.trim().toLowerCase();
            const cityOptions = Array.from(form.elements.event_city.options || []);
            const matchedOption = cityOptions.find((option) => option.value.toLowerCase() === normalizedCity);

            if (matchedOption) {
                form.elements.event_city.value = matchedOption.value;
            }
        }

        if (dateValue) {
            const normalizedDate = dateValue.trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
                form.elements.event_date.value = normalizedDate;
            }
        }
    }

    if (!form) {
        return;
    }

    applyPrefilledValues();

    const fieldNames = {
        event_city: 'Event city',
        event_date: 'Event date',
        phone: 'Phone number',
        mahotsav_experience: 'Mahotsav experience',
        interview_experience: 'Interview experience',
        job_opportunities: 'Job opportunities',
        recommend_friends: 'Recommend friends',
        suggestion: 'Suggestion'
    };

    function setStatus(message, type) {
        if (!formStatus) {
            return;
        }

        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }

    function clearError(fieldName) {
        const field = form.elements[fieldName];
        const errorElement = document.querySelector('[data-error-for="' + fieldName + '"]');

        if (field && field instanceof HTMLElement) {
            field.classList.remove('input-error');
        }

        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function showError(fieldName, message) {
        const field = form.elements[fieldName];
        const errorElement = document.querySelector('[data-error-for="' + fieldName + '"]');

        if (field && field instanceof HTMLElement) {
            field.classList.add('input-error');
        }

        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function getSelectedRadioValue(name) {
        const radio = form.querySelector('input[name="' + name + '"]:checked');
        return radio ? radio.value : '';
    }

    function validatePhone(value) {
        const digits = value.replace(/\D/g, '');

        if (!digits) {
            return { valid: false, message: currentLang === 'hi' ? 'फ़ोन नंबर आवश्यक है।' : 'Phone number is required.' };
        }

        if (digits.length !== 10) {
            return { valid: false, message: currentLang === 'hi' ? 'कृपया ठीक 10 अंक दर्ज करें।' : 'Please enter exactly 10 digits.' };
        }

        return { valid: true, normalized: '+91 ' + digits.slice(0, 5) + ' ' + digits.slice(5) };
    }

    function validateForm() {
        let isValid = true;
        const errors = {};

        const eventCity = (form.elements.event_city.value || '').trim();
        if (!eventCity) {
            errors.event_city = 'Please select the event city.';
            isValid = false;
        }

        const eventDate = (form.elements.event_date.value || '').trim();
        if (!eventDate) {
            errors.event_date = 'Please choose the event date.';
            isValid = false;
        }

        const phoneResult = validatePhone(form.elements.phone.value || '');
        if (!phoneResult.valid) {
            errors.phone = phoneResult.message;
            isValid = false;
        }

        const requiredScaleFields = ['mahotsav_experience', 'interview_experience', 'job_opportunities', 'recommend_friends'];
        requiredScaleFields.forEach((fieldName) => {
            if (!getSelectedRadioValue(fieldName)) {
                errors[fieldName] = 'Please choose an option.';
                isValid = false;
            }
        });

        Object.keys(fieldNames).forEach((fieldName) => {
            clearError(fieldName);
        });

        Object.entries(errors).forEach(([fieldName, message]) => {
            showError(fieldName, message);
        });

        return { isValid, eventCity, eventDate, phoneResult };
    }

    function buildPayload() {
        const validation = validateForm();

        if (!validation.isValid) {
            throw new Error('Validation failed');
        }

        const payload = {
            event_city: validation.eventCity.toLowerCase(),
            event_date: validation.eventDate,
            phone: validation.phoneResult.normalized,
            mahotsav_experience: Number(getSelectedRadioValue('mahotsav_experience')),
            interview_experience: Number(getSelectedRadioValue('interview_experience')),
            job_opportunities: getSelectedRadioValue('job_opportunities'),
            recommend_friends: getSelectedRadioValue('recommend_friends'),
            suggestion: (form.elements.suggestion.value || '').trim()
        };

        return payload;
    }

    function submitFallbackForm(data) {
        const formData = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const configuredApiUrl = getConfiguredApiUrl();
        if (!configuredApiUrl) {
            throw new Error('Feedback API is not configured for this environment. Set window.MAHOTSAV_FEEDBACK_API_URL to your backend URL before submitting.');
        }

        return fetch(configuredApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: formData.toString()
        });
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        setStatus('', '');

        try {
            const configuredApiUrl = getConfiguredApiUrl();
            if (!configuredApiUrl) {
                throw new Error('Feedback API is not configured for this environment. Set window.MAHOTSAV_FEEDBACK_API_URL to your backend URL before submitting.');
            }

            const payload = buildPayload();
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            let response = await fetch(configuredApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 415 || response.status === 400) {
                    response = await submitFallbackForm(payload);
                }
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Unable to submit feedback right now. Please try again.');
            }

            window.location.href = 'thank-you.html?lang=' + encodeURIComponent(currentLang);
        } catch (error) {
            const message = error && error.message ? error.message : 'Unable to submit feedback right now. Please try again.';
            setStatus(message, 'error');
        } finally {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Feedback';
            }
        }
    });

    document.addEventListener('input', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target.name === 'phone') {
            target.value = target.value.replace(/\D/g, '').slice(0, 10);
            const phoneResult = validatePhone(target.value || '');
            if (!phoneResult.valid) {
                showError('phone', phoneResult.message);
            } else {
                clearError('phone');
            }
        }
    });

    document.addEventListener('change', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const fieldName = target.name || target.id;
        if (!fieldName) {
            return;
        }

        if (fieldName === 'phone') {
            const phoneResult = validatePhone(target.value || '');
            if (!phoneResult.valid) {
                showError('phone', phoneResult.message);
            } else {
                clearError('phone');
            }
        }

        if (target.matches('input[type="radio"]')) {
            const name = target.name;
            if (name) {
                clearError(name);
            }
        }
    });
})();
