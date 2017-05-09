class EventManager
{
	constructor()
	{
		console.log("new Event manager");
		this.events = [];
	}

	create(elements)
	{
		if(this.verifyContent(elements))
		{
			let newEvent = {
				title: elements['task-title'].value,
				start: elements['task-date-start'].value + 'T' + elements['task-schedule-start'].value,
				end: elements['task-date-end'].value + 'T' + elements['task-schedule-end'].value,
				editable: true
			}
			this.events.push(newEvent);
			this.customRefetch();
			$('#calendar').fullCalendar('addEventSource', this.events);
			return true;
		}
		else
		{
			UIkit.notification(
			{
				message: 'Erreur',
				status: 'danger',
				pos: 'top-center',
				timeout: 1000
			});
			return false;
		}
	}

	verifyContent(elements)
	{
		if(!elements['task-title'].value == "" &&
			!elements['task-date-start'].value == "" &&
			!elements['task-date-end'].value == "" &&
			!elements['task-schedule-start'].value == "" &&
			!elements['task-schedule-end'].value == "")
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	// search an other solution for this function
	customRefetch()
	{
		$('#calendar').fullCalendar('removeEventSources');
	}

	remove(id)
	{
		$('#calendar').fullCalendar('removeEvents', id);
	}

	update(elements, calEvent)
	{
		var start_data = calEvent.start._i;
		var start_rslt = start_data.match(/^(.{10})T(.{5})$/);
		var start_date = start_rslt[1];
		var start_hour = start_rslt[2];

		var end_data = calEvent.end._i;
		var end_rslt = end_data.match(/^(.{10})T(.{5})$/);
		var end_date = end_rslt[1];
		var end_hour = end_rslt[2];

		
		// regexp decoupe
		// calEvent.title = elements['task-title'].value;
		//
		// $('#calendar').fullCalendar('updateEvent', calEvent);
	}
}
