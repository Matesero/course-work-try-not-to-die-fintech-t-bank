function setClick(id) {
    const listDiv = document.getElementById(`select-${id}`);
    const dropdown = document.getElementById(id);

    if (!listDiv || !dropdown) {
        return;
    }

    listDiv.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    })

    listDiv.addEventListener('wheel', (event) => {
        event.preventDefault();
        listDiv.scrollLeft += event.deltaY;
    });

    window.addEventListener('click', (event) => {
        if (
          event.srcElement !== listDiv &&
          !Array.from(document.querySelectorAll('.dropdown__item')).includes(event.srcElement)
        ) {
            dropdown.classList.add('hidden')
        }
    })
}

export class Dropdown {
    options = [];
    valueOptions = [];
    selectedOptions = [];
    selected = [];
    id = '';

    constructor(options, valueOptions, selectedOptions, id, selected = null) {
        this.options = options;
        this.valueOptions = valueOptions;
        this.selectedOptions = selectedOptions;
        this.id = id;
        if (selected) this.selected = selected;
        this.createOptionsList();
        this.recreateSelectedList();
        setClick(id);
    }

    addNewOptions (options, valueOptions, selectedOptions) {
        this.options.push(...options);
        this.valueOptions.push(...valueOptions);
        this.selectedOptions.push(...selectedOptions);

        this.createOptionsList()
    }

    setSelected(selected) {
        this.selected = [];

        selected.forEach((value) => {
            this.selected.push(this.getOptionValue(value))
        })


        this.recreateSelectedList();
        this.createOptionsList();
    }

    createOptionsList() {
        const list = document.getElementById(this.id);
        list.innerHTML = '';

        if (!list) {
            // Ошибка
            console.log("erorr");
        }

        list.childNodes.forEach((child) => {
            child.remove();
        })

        this.options.forEach((option) => {
            const optionDiv = document.createElement('div');
            optionDiv.addEventListener('click', () => this.toggleSelection(optionDiv, option))
            optionDiv.classList.add("dropdown__item");
            optionDiv.setAttribute('data-value', this.getValueOption(option));
            optionDiv.textContent = option;

            if (this.selected.includes(option)) {
                optionDiv.classList.add('selected');
            }
            list.appendChild(optionDiv);
        })
    }

    getSelectedOption(value) {
        return this.selectedOptions[this.options.indexOf(value)]
    }

    getOptionValue(value) {
        return this.options[this.valueOptions.indexOf(value)];
    }

    getValueOption(option) {
        return this.valueOptions[this.options.indexOf(option)];
    }

    getValueOptions() {
        let list = [];

        this.selected.forEach((select) => {
            list.push(this.getValueOption(select));
        })

        return list;
    }

    addToSelected(value) {
        if (!this.selected.includes(value)) {
            this.selected.push(value);
        }
    }

    removeFromSelected(value) {
        const index = this.selected.indexOf(value);
        if (index !== -1) {
            this.selected.splice(index, 1);
        }
    }

    toggleSelection(optionDiv) {
        const isSelected = optionDiv.classList.contains('selected');
        const value = optionDiv.textContent;

        if (isSelected) {
            optionDiv.classList.remove('selected');
            this.removeFromSelected(value);
        } else {
            optionDiv.classList.add('selected');
            this.addToSelected(value);
        }

        this.recreateSelectedList();
    }

    recreateSelectedList() {
        const list = document.getElementById(`select-${this.id}`);

        if (!list) {
            // ошибка
        }

        if (!this.selected.length) {
            list.textContent = 'Выберите';
            return;
        }

        list.textContent = '';

        this.selected.forEach((select) => {
            const selectDiv = document.createElement('div');
            selectDiv.className = "input-list__item";

            const valueP = document.createElement('p');
            valueP.className = "value"
            valueP.textContent = this.getSelectedOption(select);

            selectDiv.appendChild(valueP);

            list.appendChild(selectDiv);
        })
    }
}