<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'Calendar',
    props: {
      list: {
        type: Array,
        default: null,
      },
      queryYear: {
        type: Number,
        default: null,
      },
    },
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['red'],
      formatDateTime: 'YYYY-MM-DDTHH:MM:SSZ',
    }),
    watch: {
      list (value) {
        this.updateCalender(value)
      },
      focus (value) {
        const d = new Date(value)
        const n = d.getFullYear()
        if (this.queryYear !== n) {
          this.$emit('update:year', n)
        }
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
        this.type = 'day'
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          const data = {
            _id: event._id,
            holiday_date: this.formatDate(event.start),
            holiday_type: event.type,
            holiday_name: event.name,
          }
          setTimeout(() => {
            this.selectedOpen = true
            this.$emit('update:selectedOpen', true)
            this.$emit('update:editForm', data)
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          this.$emit('update:selectedOpen', false)
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []
        if (this.list.length > 0) {
          for (let i = 0; i < this.list.length; i++) {
            events.push({
              _id: this.list[i]._id,
              type: this.list[i].holiday_type,
              name: this.list[i].holiday_name,
              start: new Date(this.list[i].holiday_date),
              color: this.colors[0],
            })
          }
        }
        this.events = events
      },
      updateCalender (value) {
        const events = []
        if (value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            events.push({
              _id: value[i]._id,
              type: value[i].holiday_type,
              name: value[i].holiday_name,
              start: new Date(value[i].holiday_date),
              color: this.colors[0],
            })
          }
        }
        this.events = events
      },
      formatDate (date) {
        date = date ? this.$moment(date).format(this.formatDateTime) : '-'
        return date
      },
    },
  }
</script>
<style lang="sass">
    .v-calendar-weekly__week
        .v-calendar-weekly__day
            .v-calendar-weekly__day-label
                .v-btn
                    color: black !important
    .v-calendar-daily_head-day-label
      .v-btn
        color: black !important
</style>
