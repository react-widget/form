import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";

export default class FormItemBase extends React.Component {
    static contextType = FormContext;

    static propTypes = {
        name: PropTypes.string,
        rules: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.func
        ]),
        required: PropTypes.bool
    };

    static defaultProps = {};

    constructor(props, ...args) {
        super(props, ...args);
        const { form } = this.context;

        if (props.name) {
            form.addField(this);
        }
    }

    componentWillUnmount() {
        const { form } = this.context;
        form.removeField(this);
    }

    isRequired() {
        const { form } = this.context;
        const { name } = this.props;
        let rules = form.getFieldRules(name);
        let isRequired = false;

        if (rules && rules.length) {
            isRequired = rules.some(rule => rule.required);
        }

        return isRequired;
    }

    getValue() {
        const { name } = this.props;
        const { form } = this.context;

        return form.getValue(name);
    }

    onFieldChange(value, e) {}

    render() {
        return null;
    }
}
