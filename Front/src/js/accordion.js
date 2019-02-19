function Accordion(options)
{
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels    = options.panels;
}

Accordion.prototype.start = function()
{
	const target = document.getElementById(this.container);

	if(this.mainTitle)
	{
		const main_title = document.createElement('h1');
		main_title.className = 'accordion-main-title';
		main_title.innerHTML = this.mainTitle;
		target.appendChild(main_title);
	}

	if(this.panels.length > 0)
	{
		var panels_wrapper = document.createElement('div');
		panels_wrapper.className = 'panels-wrapper';

		// Creo il contenuto dei pannelli
		this.panels.forEach(function(panel, index)
		{
			let item       = document.createElement('div');
			item.className = 'panel';

			let expand       = document.createElement('i');
			expand.className = 'material-icons';
			expand.innerHTML = 'expand_more';
			item.appendChild(expand);

			let title       = document.createElement('h2');
			title.className = 'panel-title';
			title.innerHTML = panel.title;
			item.appendChild(title);

			if(panel.subtitle)
			{
				let subtitle       = document.createElement('h3');
				subtitle.className = 'panel-subtitle';
				subtitle.innerHTML = panel.subtitle;
				item.appendChild(subtitle);
			}

			let panel_content           = document.createElement('div');
				panel_content.className = 'panel-content';

			let doc            = new DOMParser(),
				nodes          = doc.parseFromString(panel.content, 'text/html'),
				filtered_nodes = nodes.body.childNodes;

			// Converto i nodi in array
			let content = Array.from(filtered_nodes);

			content.forEach(function(item)
			{
				panel_content.appendChild(item);
			});

			item.appendChild(panel_content);

			// Gestione azione dei pannelli dell'accordion
			item.addEventListener("click", function()
			{
				let elements = panels_wrapper.children;

				for(let i = 0; i < elements.length; i++)
				{
					if(this === elements[i])
					{
						this.classList.toggle("active")
					}

					else
					{
						elements[i].classList.remove('active');
						elements[i].getElementsByTagName("i")[0].innerHTML = "expand_more";
					}
				}
			});

			// Inserisco il pannello (item) nel div contenitore
			panels_wrapper.appendChild(item);
		 });
	}

	target.appendChild(panels_wrapper);
};