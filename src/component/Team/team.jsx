import React from 'react'
import './OrganisingCommitee.css'
import DotGrid from '../DotGrid'

// Use hosted placeholder icons/images so the component doesn't depend on local assets
const linkedinIcon = 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
const instagramIcon = 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png'
const gmailIcon = 'https://cdn-icons-png.flaticon.com/512/732/732200.png'

const shashank = 'https://via.placeholder.com/300x300?text=Shashank'
const shree = 'https://via.placeholder.com/300x300?text=Shree+Bhagwan'

const OrganisingCommitee = () => {
  const coreTeam = [
   
    {
      id: 2,
      name: 'Shree Bhagwan Singh',
      role: 'Website Designer',
      image: shree,
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
     {
      id: 1,
      name: 'Shashank Pandey',
      role: 'Website Devloper',
      image: shashank,
      socials: {
        linkedin: 'https://www.linkedin.com/in/shashank-pandey-2a3724291/',
        instagram: 'https://instagram.com/shashankpandey4730',
        email: 'shashankp846@gmail.com'
      }
    },
    {
      id: 3,
      name: 'Deepansha Arya',
      role: 'Cultural Head',
      image: 'https://via.placeholder.com/300x300?text=Deepansha',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
    {
      id: 4,
      name: 'Jaypal Rangeela',
      role: 'SAC Treasurer',
      image: 'https://via.placeholder.com/300x300?text=Jaypal',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
    {
      id: 5,
      name: 'Team Member 5',
      role: 'Event Coordinator',
      image: 'https://via.placeholder.com/300x300?text=Event+Coordinator',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
    {
      id: 6,
      name: 'Team Member 6',
      role: 'Technical Head',
      image: 'https://via.placeholder.com/300x300?text=Technical+Head',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
    {
      id: 7,
      name: 'Team Member 7',
      role: 'Sponsorship Lead',
      image: 'https://via.placeholder.com/300x300?text=Sponsorship',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
    {
      id: 8,
      name: 'Team Member 8',
      role: 'Content Lead',
      image: 'https://via.placeholder.com/300x300?text=Content+Lead',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: '#'
      }
    },
  ]

  return (
    <div className="committee-page relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={100}
          shockRadius={220}
          shockStrength={4}
          resistance={700}
          returnDuration={1.2}
        />
      </div>
      <div className="relative z-10 committee-inner">
        <div className="committee-header">
          <h1 className="committee-title">CORE TEAM</h1>
          <div className="committee-title-star">★</div>
        </div>

        <div className="committee-content">
          <div className="team-grid">
          {coreTeam.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-image-wrapper">
                <div className="member-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="member-image"
                  />
                  <div className="member-socials-overlay">
                    <a href={member.socials.linkedin} className="social-icon-overlay linkedin" title="LinkedIn">
                      <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    <a href={member.socials.instagram} className="social-icon-overlay instagram" title="Instagram">
                      <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href={member.socials.email} className="social-icon-overlay email" title="Email">
                      <img src={gmailIcon} alt="Gmail" />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="member-name">{(member.name || "").toUpperCase()}</h3>
              <p className="member-role">{(member.role || "").toUpperCase()}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default OrganisingCommitee