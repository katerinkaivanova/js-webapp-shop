class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w\.-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Формат телефона +7(000)000-0000',
            email: 'Формат e-mail mymail@email.ru, my.mail@email.ru или my-mail@email.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    _validateForm() {
        let errors = [...document.querySelector(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors) {
            error.remove();
        }
        let formFields = [...document.querySelector(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validate(field);
        }
        if (![...document.querySelector(this.form).querySelectorAll(`.invalid`)].length) {
            this.valid = true;
        }
    }

    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }

    _addErrorMsg(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    _watchField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }
}