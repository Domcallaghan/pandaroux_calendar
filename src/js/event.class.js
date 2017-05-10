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
			// We highlight required input fields
			$("input:required").addClass("uk-form-danger");

			// We remove input danger class on focus
			$("input:required").focus(function()
			{
				$(this).removeClass("uk-form-danger");
			});
			UIkit.notification(
			{
				message: 'Remplissez les champs requis',
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
		// regexp decoupe
		// calEvent.title = elements['task-title'].value;
		//
		// $('#calendar').fullCalendar('updateEvent', calEvent);
	}
}
