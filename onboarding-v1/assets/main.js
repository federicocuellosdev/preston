document.addEventListener('DOMContentLoaded', function() {
    // Fire on_0 event on page load
    if (typeof gtag === 'function') {
        gtag('event', 'on_0', {
            'event_category': 'Onboarding',
            'event_label': 'Page Load'
        });
    }

    const optionButtons = document.querySelectorAll('.option-button');
    const backButtons = document.querySelectorAll('.back-button');
    const nextFromDatosPersonalesButton = document.getElementById('next-from-datos-personales');
    const datosPersonalesError = document.getElementById('datos-personales-error');
    const resendDataButton = document.getElementById('resend-data');
    const datosPersonalesQuestion = document.querySelector('#step-datos-personales .question');
    const originalDatosPersonalesQuestionText = datosPersonalesQuestion.textContent;
    const originalNextFromDatosPersonalesButtonText = nextFromDatosPersonalesButton.textContent;

    let previousStepId = '';

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const selection = this.getAttribute('data-value') || this.textContent.trim();

            if (currentStep.id === 'step1') {
                if (typeof gtag === 'function') {
                    gtag('event', 'on_1', {
                        'event_category': 'Onboarding',
                        'event_label': selection
                    });
                }
                if (selection === 'Otros') {
                    if (typeof gtag === 'function') {
                        gtag('event', 'on_rechazado', {
                            'event_category': 'Onboarding',
                            'event_label': 'Otros en Paso 1'
                        });
                    }
                }
            } else if (currentStep.id === 'step-empleado-publico' || currentStep.id === 'step-jubilado') {
                sessionStorage.setItem('categoria', selection);
                previousStepId = currentStep.id;

                if (typeof gtag === 'function') {
                    gtag('event', 'on_2', {
                        'event_category': 'Onboarding',
                        'event_label': selection
                    });
                }
                if (selection === 'Otros') {
                    if (typeof gtag === 'function') {
                        gtag('event', 'on_rechazado', {
                            'event_category': 'Onboarding',
                            'event_label': 'Otros en Paso 2'
                        });
                    }
                }
            }

            console.log('Selected option:', selection);

            const nextStepId = this.getAttribute('data-next');
            if (nextStepId) {
                const nextStep = document.getElementById(nextStepId);
                if (nextStep) {
                    if (datosPersonalesError) {
                        datosPersonalesError.style.display = 'none';
                    }
                    currentStep.style.display = 'none';
                    nextStep.style.display = 'flex';
                }
            }
        });
    });

    if (nextFromDatosPersonalesButton) {
        nextFromDatosPersonalesButton.addEventListener('click', function() {
            const nombreInput = document.querySelector('#step-datos-personales input[placeholder="Nombre"]');
            const apellidoInput = document.querySelector('#step-datos-personales input[placeholder="Apellido"]');
            const telefonoInput = document.querySelector('#step-datos-personales input[type="tel"]');
            const dniInput = document.querySelector('#step-datos-personales input[placeholder="DNI"]');

            const nombre = nombreInput.value.trim();
            const apellido = apellidoInput.value.trim();
            const telefono = telefonoInput.value.trim();
            const dni = dniInput.value.trim();

            if (nombre && apellido && telefono && dni) {
                sessionStorage.setItem('nombre', nombre);
                sessionStorage.setItem('apellido', apellido);
                sessionStorage.setItem('telefono', telefono);
                sessionStorage.setItem('dni', dni);
                console.log('Final data:', sessionStorage);

                if (datosPersonalesError) {
                    datosPersonalesError.style.display = 'none';
                }

                // Show loading state
                nextFromDatosPersonalesButton.disabled = true;
                nextFromDatosPersonalesButton.textContent = 'Enviando datos';
                datosPersonalesQuestion.textContent = 'Aguarde por favor';
                datosPersonalesQuestion.classList.add('loading-question');

                if (typeof gtag === 'function') {
                    gtag('event', 'on_3', {
                        'event_category': 'Onboarding',
                        'event_label': 'Datos Personales Completados'
                    });
                }

                fetch('https://indu-otfj.onrender.com/preston', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        categoria: sessionStorage.getItem('categoria'),
                        nombre: sessionStorage.getItem('nombre'),
                        apellido: sessionStorage.getItem('apellido'),
                        telefono: sessionStorage.getItem('telefono'),
                        dni: sessionStorage.getItem('dni')
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data);
                    if (typeof gtag === 'function') {
                        gtag('event', 'on_lead', {
                            'event_category': 'Onboarding',
                            'event_label': 'API Response Received'
                        });
                    }

                    if (typeof fbq === 'function') {
                        fbq('track', 'Lead');
                    }

                    // Reset loading state
                    nextFromDatosPersonalesButton.disabled = false;
                    nextFromDatosPersonalesButton.textContent = originalNextFromDatosPersonalesButtonText;
                    datosPersonalesQuestion.textContent = originalDatosPersonalesQuestionText;
                    datosPersonalesQuestion.classList.remove('loading-question');

                    if (data.success === false) {
                        if (typeof gtag === 'function') {
                            gtag('event', 'on_error', {
                                'event_category': 'Onboarding',
                                'event_label': 'API Response False'
                            });
                        }
                        if (typeof gtag === 'function') {
                            gtag('event', 'on_rechazado', {
                                'event_category': 'Onboarding',
                                'event_label': 'API Rechazo'
                            });
                        }
                        document.getElementById('step-datos-personales').style.display = 'none';
                        document.getElementById('step-error').style.display = 'flex';
                    } else {
                        document.getElementById('step-datos-personales').style.display = 'none';
                        document.getElementById('step-success').style.display = 'flex';
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                    // Reset loading state
                    nextFromDatosPersonalesButton.disabled = false;
                    nextFromDatosPersonalesButton.textContent = originalNextFromDatosPersonalesButtonText;
                    datosPersonalesQuestion.textContent = originalDatosPersonalesQuestionText;
                    datosPersonalesQuestion.classList.remove('loading-question');

                    if (typeof gtag === 'function') {
                        gtag('event', 'on_rechazado', {
                            'event_category': 'Onboarding',
                            'event_label': 'Error de Red'
                        });
                    }
                    document.getElementById('step-datos-personales').style.display = 'none';
                    document.getElementById('step-error').style.display = 'flex';
                });

            } else {
                if (datosPersonalesError) {
                    datosPersonalesError.style.display = 'block';
                }
            }
        });
    }

    if (resendDataButton) {
        resendDataButton.addEventListener('click', function() {
            location.reload();
        });
    }

    const wspNotifyButton = document.getElementById('wsp-notify-button');
    if (wspNotifyButton) {
        wspNotifyButton.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'on_wa_click', {
                    'event_category': 'Onboarding',
                    'event_label': 'Aviso WhatsApp Finalizado'
                });
            }
            window.open('https://web.whatsapp.com/send/?phone=5493412521743&text=Hola%2C%20acabo%20de%20completar%20los%20datos%20para%20saber%20si%20puedo%20acceder%20a%20un%20pr%C3%A9stamo&type=phone_number&app_absent=false', '_blank');
        });
    }

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepIdAttr = button.getAttribute('data-prev');
            const currentStep = button.closest('.form-step');
            let prevStep;

            if (prevStepIdAttr) {
                prevStep = document.getElementById(prevStepIdAttr);
            } else if (currentStep.id === 'step-datos-personales') {
                prevStep = document.getElementById(previousStepId);
            } else if (currentStep.id === 'step-error') {
                prevStep = document.getElementById('step-datos-personales');
            } else if (currentStep.id === 'step-success') {
                prevStep = document.getElementById('step1');
            }

            if (currentStep && prevStep) {
                if (datosPersonalesError) {
                    datosPersonalesError.style.display = 'none';
                }

                if (currentStep.id === 'step-empleado-publico' || currentStep.id === 'step-jubilado') {
                    sessionStorage.removeItem('categoria');
                } else if (currentStep.id === 'step-datos-personales') {
                    sessionStorage.removeItem('nombre_completo');
                    sessionStorage.removeItem('telefono');
                    sessionStorage.removeItem('dni');
                }
                currentStep.style.display = 'none';
                prevStep.style.display = 'flex';
            }
        });
    });
});