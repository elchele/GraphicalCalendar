({
	/* 	Author: Angel Magaña -- cheleguanaco@cheleguanaco.com
	*  	File: ./custom/clients/base/views/dashlet-calendar/dashlet-calendar.js
	*	
	*	Version: 1.0	
	*
	*  	Controller for graphical calendar dashlet   
	*/

	plugins: ['Dashlet'],
	
	items: [],
	
	loadData: function(){
		this.items = [];
	
		var today = app.date.format(new Date(), 'Y-m-d'),
			activity = this.settings.attributes.activity;
		
		if (activity === 'CallsMeetings')
		{
			activity = ['Calls', 'Meetings'];
		}
		else
		{
			activity = [activity];
		}

		//var calDate = this.$('#calendar').fullCalendar('getDate');
		
		//this.$('#calendar').fullCalendar('getDate');
		//selectedDate.format('YYYY-MM-DD');
		
		_.each(activity, function(type){
			var calItems = app.data.createBeanCollection(type),
				self = this;
			
			calItems.fetch({
				params:{filter:[{'date_start':today}]},
				success: function(){
					self.handleData(calItems.models);
				},
			});			
		}, this);
	},
	
	handleData: function(calEvents){
		var self = this;
		
		_.each(calEvents, function(calEvent){ 
			//Set color on activity based on module
			var module = calEvent.get('_module'),
				color = '';
			
			if (module === 'Meetings')
			{
				color = 'blue';
			}
			else
			{
				color = 'red';
			}
			
			self.items[self.items.length] = {
				title: calEvent.get('name'),
				start: calEvent.get('date_start'),
				color: color,
				allDay: false,
				url: '#' + module + '/' + calEvent.id
			};
		});
		
		self.render();
	},

	render: function(){
		this._super('render');
		
		this.$('#calendar').fullCalendar({
				//timezone: app.user.getPreference('timezone'),
        		defaultView: 'agendaDay', 
        		events: this.items,
        		//lang: 'es',
				businessHours: {
									start: '08:00', 
									end: '18:00', 
								},
				/* 
				eventClick: function(calEvent, jsEvent, view){
					console.log(calEvent);
				},
				*/
				dayClick: function(date, jsEvent, view){
					var tzo = app.user.getPreference('tz_offset'),
						dateTimeFormat = app.user.getPreference('datepref') + ' ' + app.user.getPreference('timepref'),
						date_start_date = date.format() + tzo,
						defaults = {date_start: date_start_date};
					
					app.drawer.open({
						layout: 'create',
						context:{
							create:true,
							model:app.data.createBean('Meetings', defaults),
							module: 'Meetings'
						}
					});
				},
    	});    	
	},
	
	_dispose: function(){
		this._super('_dispose');
	}
})