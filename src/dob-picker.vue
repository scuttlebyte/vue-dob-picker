<script>
    import moment from 'moment'

    export default {
        name: 'DobPicker',
        props: {
            field: {
                type: String,
                default: null
            },
            format: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            inputClass: {
                type: Object|String|Array,
                default: () => ['form-control']
            },
            labelClass: {
                type: Object|String|Array,
                default: () => ['small']
            },
            inputWrapperClass: {
                type: Object|String|Array,
                default: () => ['col']
            },
            wrapperClass: {
                type: Object|String|Array,
                default: () => ['form-group', 'row']
            },
            floor: {
                type: Number,
                default: 100
            },
            value: {
                type: Date|moment|String,
                default: () => {
                    return null
                }
            }
        },

        data() {
            return {
                year: '',
                month: '',
                day: ''
            }
        },

        created() {
            if (this.value) {

                let date;

                if (moment.isMoment(this.value)) {
                    date = this.value
                }
                else if (typeof this.value === 'string') {
                    date = moment(this.value, this.format)
                }
                else {
                    date = moment(this.value)
                }

                this.year = date.year()
                this.month = date.month()
                this.day = date.date()
            }
        },

        computed: {
            /**
             * @return moment.Moment
             */
            date() {
                return moment([this.year, this.month, this.day])
            },

            years() {
                const current = moment().year()

                return this.range(current - this.floor, current).reverse()
            },

            months() {
                return this.range(1, 12)
            },

            days() {
                if (this.month && this.year) {
                    const edge = moment().year(this.year).month(this.month)

                    return this.range(1, edge.daysInMonth())
                }

                if (this.month && this.month !== 2) {
                    return this.range(1, moment().month(this.month).daysInMonth())
                }

                return this.range(1, 31)
            },

            inputLabelDay() {
                const uid = this._uid

                return `inputLabelDay${uid}`
            },

            inputLabelMonth() {
                const uid = this._uid

                return `inputLabelMonth${uid}`
            },

            inputLabelYear() {
                const uid = this._uid

                return `inputLabelYear${uid}`
            },
        },

        methods: {
            /**
             * @link https://wsvincent.com/javascript-array-range-function/
             */
            range(start, edge, step) {
                // If only 1 number passed make it the edge and 0 the start
                if (arguments.length === 1) {
                    edge = start;
                    start = 0;
                }

                // Validate edge/start
                edge = edge || 0;
                step = step || 1;

                // Create array of numbers, stopping before the edge
                let arr = [];
                for (arr; (edge - start) * step >= 0; start += step) {
                    arr.push(start);
                }
                return arr
            },

            updateInput () {
                this.$emit('input', this.date)
            }
        },
    }
</script>

<template>
    <div :class="wrapperClass" data-jest="component-wrapper">

        <div :class="inputWrapperClass" data-jest="month-input-wrapper">
            <label :for="inputLabelMonth" :class="labelClass" data-jest="month-label">Month</label>
            <select :id="inputLabelMonth" data-jest="month-input" v-model="month" :class="inputClass" @change="updateInput">
                <option disabled value="">Choose</option>
                <option v-for="monthOption, monthValue in months" :value="monthValue">{{monthOption}}</option>
            </select>
        </div>

        <div :class="inputWrapperClass" data-jest="day-input-wrapper">
            <label :for="inputLabelDay" :class="labelClass" data-jest="day-label">Day</label>
            <select :id="inputLabelDay" data-jest="day-input" v-model="day" :class="inputClass" @change="updateInput">
                <option disabled value="">Choose</option>
                <option v-for="dayOption in days" :value="dayOption">{{dayOption}}</option>
            </select>
        </div>

        <div :class="inputWrapperClass" data-jest="year-input-wrapper">
            <label :for="inputLabelYear" :class="labelClass" data-jest="year-label">Year</label>
            <select :id="inputLabelYear" data-jest="year-input" v-model="year" :class="inputClass" @change="updateInput">
                <option disabled value="">Choose</option>
                <option v-for="yearOption in years" :value="yearOption">{{yearOption}}</option>
            </select>
        </div>

        <input type="hidden" :value="date.format(format)" v-if="field" :name="field">
    </div>
</template>
