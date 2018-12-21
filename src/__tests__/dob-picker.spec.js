import { mount } from '@vue/test-utils'
import DobPicker from '../dob-picker'
import moment from 'moment'

describe('DOB Picker', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(DobPicker)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('starts with a date as a string', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'value': '1987-05-22'
            }
        })

        expect(wrapper.find('[data-jest=day-input]').element.value).toEqual("22")
        expect(wrapper.find('[data-jest=month-input]').element.value).toEqual("4")
        expect(wrapper.find('[data-jest=year-input]').element.value).toEqual("1987")
    })

    test('starts with a date as a different format string', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'value': '05-22-1987',
                'format': 'MM-DD-YYYY'
            }
        })

        expect(wrapper.find('[data-jest=day-input]').element.value).toEqual("22")
        expect(wrapper.find('[data-jest=month-input]').element.value).toEqual("4")
        expect(wrapper.find('[data-jest=year-input]').element.value).toEqual("1987")
    })


    test('starts with a date as an object', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'value': new Date(1987, 4, 22)
            }
        })

        expect(wrapper.find('[data-jest=day-input]').element.value).toEqual("22")
        expect(wrapper.find('[data-jest=month-input]').element.value).toEqual("4")
        expect(wrapper.find('[data-jest=year-input]').element.value).toEqual("1987")

    })

    test('starts with a date as a moment object', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'value': moment([1987, 4, 22])
            }
        })

        expect(wrapper.find('[data-jest=day-input]').element.value).toEqual("22")
        expect(wrapper.find('[data-jest=month-input]').element.value).toEqual("4")
        expect(wrapper.find('[data-jest=year-input]').element.value).toEqual("1987")
    })

    test('choosing values sets the date', () => {
        const wrapper = mount(DobPicker)

        const dayInput = wrapper.find('[data-jest=day-input]')
        const monthInput = wrapper.find('[data-jest=month-input]')
        const yearInput = wrapper.find('[data-jest=year-input]')

        expect(dayInput.element.value).not.toEqual("4")
        expect(monthInput.element.value).not.toEqual("3")
        expect(yearInput.element.value).not.toEqual("1997")

        dayInput.setValue('22')
        monthInput.setValue('4')
        yearInput.setValue('1987')

        expect(dayInput.element.value).toEqual("22")
        expect(monthInput.element.value).toEqual("4")
        expect(yearInput.element.value).toEqual("1987")

        expect(moment.isMoment(wrapper.vm.date)).toBeTruthy()
        expect(wrapper.vm.date.isSame('1987-05-22')).toBe(true)
        expect(wrapper.emitted().input[2][0].isSame('1987-05-22')).toBe(true)
        expect(wrapper.emitted().input.length).toBe(3)
    })

    test('class values can be overridden with a string', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'wrapper-class': 'foo-bar-wrapper',
                'input-wrapper-class': 'foo-bar-input-wrapper',
                'input-class': 'foo-bar-input',
                'label-class': 'foo-bar-label'
            }
        })

        const dayInputWrapper = wrapper.find('[data-jest=day-input-wrapper]')
        const monthInputWrapper = wrapper.find('[data-jest=month-input-wrapper]')
        const yearInputWrapper = wrapper.find('[data-jest=year-input-wrapper]')

        const dayLabel = wrapper.find('[data-jest=day-label]')
        const monthLabel = wrapper.find('[data-jest=month-label]')
        const yearLabel = wrapper.find('[data-jest=year-label]')

        const dayInput = wrapper.find('[data-jest=day-input]')
        const monthInput = wrapper.find('[data-jest=month-input]')
        const yearInput = wrapper.find('[data-jest=year-input]')

        const componentWrapper = wrapper.find('[data-jest=component-wrapper]')

        expect(dayInputWrapper.classes()).toContain("foo-bar-input-wrapper")
        expect(monthInputWrapper.classes()).toContain("foo-bar-input-wrapper")
        expect(yearInputWrapper.classes()).toContain("foo-bar-input-wrapper")

        expect(dayLabel.classes()).toContain("foo-bar-label")
        expect(monthLabel.classes()).toContain("foo-bar-label")
        expect(yearLabel.classes()).toContain("foo-bar-label")

        expect(dayInput.classes()).toContain("foo-bar-input")
        expect(monthInput.classes()).toContain("foo-bar-input")
        expect(yearInput.classes()).toContain("foo-bar-input")

        expect(componentWrapper.classes()).toContain('foo-bar-wrapper')
    })

    test('class values can be overridden with an array', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'wrapper-class': ['foo-bar-wrapper', 'baz-bat-input-wrapper'],
                'input-wrapper-class': ['foo-bar-input-wrapper', 'baz-bat-input-wrapper'],
                'input-class': ['foo-bar-input', 'baz-bat-input'],
                'label-class': ['foo-bar-label', 'baz-bat-label']
            }
        })

        const dayInputWrapper = wrapper.find('[data-jest=day-input-wrapper]')
        const monthInputWrapper = wrapper.find('[data-jest=month-input-wrapper]')
        const yearInputWrapper = wrapper.find('[data-jest=year-input-wrapper]')

        const dayLabel = wrapper.find('[data-jest=day-label]')
        const monthLabel = wrapper.find('[data-jest=month-label]')
        const yearLabel = wrapper.find('[data-jest=year-label]')

        const dayInput = wrapper.find('[data-jest=day-input]')
        const monthInput = wrapper.find('[data-jest=month-input]')
        const yearInput = wrapper.find('[data-jest=year-input]')

        const componentWrapper = wrapper.find('[data-jest=component-wrapper]')

        expect(dayInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])
        expect(monthInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])
        expect(yearInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])

        expect(dayLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])
        expect(monthLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])
        expect(yearLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])

        expect(dayInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])
        expect(monthInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])
        expect(yearInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])

        expect(componentWrapper.classes()).toEqual( ['foo-bar-wrapper', 'baz-bat-input-wrapper'])
    })

    test('class values can be overridden with an object', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'wrapper-class': {'foo-bar-wrapper': true, 'baz-bat-input-wrapper': true},
                'input-wrapper-class': {'foo-bar-input-wrapper': true, 'baz-bat-input-wrapper': true},
                'input-class': {'foo-bar-input': true, 'baz-bat-input': true},
                'label-class': {'foo-bar-label': true, 'baz-bat-label': true}
            }
        })

        const dayInputWrapper = wrapper.find('[data-jest=day-input-wrapper]')
        const monthInputWrapper = wrapper.find('[data-jest=month-input-wrapper]')
        const yearInputWrapper = wrapper.find('[data-jest=year-input-wrapper]')

        const dayLabel = wrapper.find('[data-jest=day-label]')
        const monthLabel = wrapper.find('[data-jest=month-label]')
        const yearLabel = wrapper.find('[data-jest=year-label]')

        const dayInput = wrapper.find('[data-jest=day-input]')
        const monthInput = wrapper.find('[data-jest=month-input]')
        const yearInput = wrapper.find('[data-jest=year-input]')

        const componentWrapper = wrapper.find('[data-jest=component-wrapper]')

        expect(dayInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])
        expect(monthInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])
        expect(yearInputWrapper.classes()).toEqual(['foo-bar-input-wrapper', 'baz-bat-input-wrapper'])

        expect(dayLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])
        expect(monthLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])
        expect(yearLabel.classes()).toEqual(['foo-bar-label', 'baz-bat-label'])

        expect(dayInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])
        expect(monthInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])
        expect(yearInput.classes()).toEqual(['foo-bar-input', 'baz-bat-input'])

        expect(componentWrapper.classes()).toEqual( ['foo-bar-wrapper', 'baz-bat-input-wrapper'])
    })

    test('includes a hidden input when field is passed', () => {
        const wrapper = mount(DobPicker, {
            propsData: {
                'field': 'some_fake_field',
            }
        })

        expect(wrapper.find('input[name=some_fake_field]').exists()).toBe(true)
    })

    test('does not include a hidden input when no field is passed', () => {
        const wrapper = mount(DobPicker)

        expect(wrapper.find('input[name=some_fake_field]').exists()).toBe(false)
    })

    test('goes back the correct number of years when a floor is passed', () => {
        const wrapper = mount(DobPicker, {
            propsData: { 'floor': 25 }
        })

        const options = wrapper.find('select[data-jest=year-input]').findAll('option');

        expect(parseInt(options.at(options.length -1).attributes('value'))).toEqual(moment().year() - 25)
    })
})
