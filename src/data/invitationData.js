// invitationData.js
import { generateCalendarLink } from './utils';
const base = import.meta.env.BASE_URL;

const invitationData = {
  coupleName: "Teosaner & Sherin",
  groom: "TEOSANER YUTANESY IMAN",
  bride: "SHERIN ANGELA",
  backgroundImage: `${base}assets/dq.jpg`,
  backgroundImage2: `${base}assets/dq2.jpg`,
  backgroundImageGroom: `${base}assets/groom.jpg`,
  backgroundImageBride: `${base}assets/bride.jpg`,
  backgroundImageLive: `${base}assets/live.jpg`,
  backgroundDesign: `${base}assets/floral.jpg`,
  audioUrl: `${base}assets/music.mp3`,
  date: "5 Januari 2025",
  time: "10.00 - 12.00 WIB",
  location: "Hotel Grand Indonesia",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa Timur\n60239",
  dateTimeImage: `${base}assets/nikah.jpg`,
  mapsLink: "https://maps.app.goo.gl/QAcpiFfeWeyWbKsbA",
  zoomLink: "https://zoom.us/your-meeting-link",
  youtubeLink: "https://youtube.com/your-livestream-link",
  galleryImages: [
    `${base}assets/1.jpg`,
    `${base}assets/2.jpg`,
    `${base}assets/3.jpg`,
    `${base}assets/4.jpg`,
    `${base}assets/5.jpg`
  ],
  get calendarLink() {
    return generateCalendarLink({
      coupleName: this.coupleName,
      date: this.date,
      time: this.time,
      location: this.location
    });
  }
};

export default invitationData;
