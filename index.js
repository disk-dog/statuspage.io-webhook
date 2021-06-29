const { WebhookClient, MessageEmbed } = require("discord.js");
const { StatuspageUpdates } = require('statuspage.js');

const data = {
    "investigating": {
        "text": "Investigating",
        "emoji": "<:statusorange:797222239979700263>",
        "color": "#ED9932"
    },
    "postmortem": {
        "text": "Postmortem",
        "emoji": "<:information:799709770390962208>",
        "color": "#738add"
    },
    "identified": {
        "text": "Identified",
        "emoji": "<:statusred:797222239661457478>",
        "color": "#F15832"
    },
    "monitoring": {
        "text": "Monitoring",
        "emoji": "<:statusyellow:797222239522390056>",
        "color": "#F2EF42"
    },
    "resolved": {
        "text": "Resolved",
        "emoji": "<:statusgreen:797222239418187786>",
        "color": "#43b582"
    }
}

const webhook = new WebhookClient("webhook id", "webhook token");
const updates = new StatuspageUpdates("statuspage id", 7500);

updates.on('incident_update', e => {
	let embed = new MessageEmbed()
    	.setAuthor("Status")
		.setFooter(`${e.components.length ? 
                   `This incident ${(e.status === "resolved" || e.status === "postmortem") ? "affected" : "affects"}: ${e.components.map(x => x.name).join(", ")}` 
					: ""}\nStarted:`)
    	.setTimestamp(e.started_at)
    	.setTitle(e.name)
    	.setURL(`link/incidents/${e.id}`)
		.addField(`${data[e.status].emoji} ${data[e.status].text}`, e.incident_updates[0].body)
		.setColor(data[e.status].color);
	webhook.send(embed);
});

updates.start().catch(console.error);
