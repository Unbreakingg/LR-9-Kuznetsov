document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productOrderForm');
    if (!form) return;

    // Получаем элементы формы
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const product = document.getElementById('product');
    const deliveryDate = document.getElementById('deliveryDate');
    const quantity = document.getElementById('quantity');
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const errorSummary = document.getElementById('errorSummary');

    // Получаем элементы сводки
    const summaryFirstName = document.getElementById('summaryFirstName');
    const summaryLastName = document.getElementById('summaryLastName');
    const summaryPhone = document.getElementById('summaryPhone');
    const summaryProduct = document.getElementById('summaryProduct');
    const summaryDate = document.getElementById('summaryDate');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryPayment = document.getElementById('summaryPayment');

    // Инициализация маски телефона
    if (typeof $.fn.mask === 'function' && phone) {
        $(phone).mask('+7 (000) 000-00-00');
    }

    // Назначаем обработчики событий
    if (firstName && lastName) {
        firstName.addEventListener('input', updateAll);
        lastName.addEventListener('input', updateAll);
    }

    if (phone) {
        phone.addEventListener('input', updateAll);
    }

    if (product) {
        product.addEventListener('change', updateAll);
    }

    if (deliveryDate) {
        deliveryDate.addEventListener('change', updateAll);
    }

    if (quantity) {
        quantity.addEventListener('input', updateAll);
    }

    paymentMethods.forEach(method => {
        method.addEventListener('change', updateAll);
    });

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Функция для обновления всего
    function updateAll() {
        validateAll();
        updateOrderSummary();
    }

    // Функция валидации всех полей
    function validateAll() {
        let isValid = true;
        isValid = validateNameField(firstName) && isValid;
        isValid = validateNameField(lastName) && isValid;
        isValid = validatePhoneField() && isValid;
        isValid = validateProductField() && isValid;
        isValid = validateDateField() && isValid;
        isValid = validateQuantityField() && isValid;
        isValid = validatePaymentField() && isValid;
        return isValid;
    }
    
    // Обработчик отправки формы
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const isValid = validateAll();
        updateOrderSummary(); // Обновляем сводку перед проверкой
        
        if (isValid) {
            alert('Форма успешно отправлена!');
            // form.submit(); // Раскомментируйте для реальной отправки
        } else {
            if (errorSummary) {
                errorSummary.textContent = 'Пожалуйста, исправьте отмеченные ошибки';
                errorSummary.style.display = 'block';
                window.scrollTo({
                    top: errorSummary.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Обработчик отправки формы
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const isValid = validateAll();
        
        if (isValid) {
            alert('Форма успешно отправлена!');
        } else {
            if (errorSummary) {
                errorSummary.textContent = 'Пожалуйста, исправьте отмеченные ошибки';
                errorSummary.style.display = 'block';
                window.scrollTo({
                    top: errorSummary.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Функции валидации отдельных полей
    function validateNameField(field) {
        if (!field) return false;
        
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        const regex = /^[А-Яа-яЁёA-Za-z\s]{2,30}$/;
        
        if (!regex.test(value)) {
            field.classList.add('input-error');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else {
            field.classList.remove('input-error');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    function validatePhoneField() {
        if (!phone) return false;
        
        const value = phone.value;
        const errorElement = document.getElementById('phoneError');
        const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        
        if (!regex.test(value)) {
            phone.classList.add('input-error');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else {
            phone.classList.remove('input-error');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    function validateProductField() {
        if (!product) return false;
        
        const value = product.value;
        const errorElement = document.getElementById('productError');
        
        if (!value) {
            product.classList.add('input-error');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else {
            product.classList.remove('input-error');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    function validateDateField() {
        if (!deliveryDate) return false;
        
        const value = deliveryDate.value;
        const errorElement = document.getElementById('dateError');
        const today = new Date().toISOString().split('T')[0];
        
        if (!value) {
            deliveryDate.classList.add('input-error');
            if (errorElement) {
                errorElement.textContent = 'Пожалуйста, выберите дату';
                errorElement.style.display = 'block';
            }
            return false;
        } else if (value < today) {
            deliveryDate.classList.add('input-error');
            if (errorElement) {
                errorElement.textContent = 'Дата не может быть в прошлом';
                errorElement.style.display = 'block';
            }
            return false;
        } else {
            deliveryDate.classList.remove('input-error');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    function validateQuantityField() {
        if (!quantity) return false;
        
        const value = quantity.value;
        const errorElement = document.getElementById('quantityError');
        
        if (!value || value < 1 || value > 10) {
            quantity.classList.add('input-error');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else {
            quantity.classList.remove('input-error');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    function validatePaymentField() {
        const checked = document.querySelector('input[name="payment"]:checked');
        const errorElement = document.getElementById('paymentError');
        
        if (!checked) {
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else {
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
    }
    
    // Функция обновления сводки заказа
    function updateOrderSummary() {
        if (summaryFirstName) summaryFirstName.textContent = firstName && firstName.value ? firstName.value : '-';
        if (summaryLastName) summaryLastName.textContent = lastName && lastName.value ? lastName.value : '-';
        if (summaryPhone) summaryPhone.textContent = phone && phone.value ? phone.value : '-';
        
        if (summaryProduct) {
            const selectedProduct = product && product.options[product.selectedIndex];
            summaryProduct.textContent = selectedProduct && selectedProduct.text ? selectedProduct.text : '-';
        }
        
        if (summaryDate) summaryDate.textContent = deliveryDate && deliveryDate.value ? deliveryDate.value : '-';
        if (summaryQuantity) summaryQuantity.textContent = quantity && quantity.value ? quantity.value : '0';
        
        if (summaryPayment) {
            const checkedPayment = document.querySelector('input[name="payment"]:checked');
            if (checkedPayment) {
                // Ищем ближайший span с текстом
                const labelText = checkedPayment.nextElementSibling?.textContent || 
                                 checkedPayment.parentElement?.textContent || '-';
                summaryPayment.textContent = labelText.trim();
            } else {
                summaryPayment.textContent = '-';
            }
        }
    }

    // Инициализация при загрузке
    updateAll();
});