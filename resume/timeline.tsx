import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Job } from './utils/getJobs';
import styles from '../styles/Timeline.module.css';
import { WorkIcon } from './workIcon';
import { Divider, List, ListItem } from '@mui/material';


interface TimelineProps {
  jobs: Job[]
}

function toTimelineElement(j: Job, key: number): JSX.Element {
  return (
    <VerticalTimelineElement
      date={j.startDate + " - " + j.endDate}
      dateClassName="on-backaground-text"
      key={key}
      iconClassName={["tertiary", "on-tertiary-text"].join(' ')}
      intersectionObserverProps={{
      }}
      icon={<WorkIcon />}
    >
      <div className='on-surface-variant-text'>
        <h1 className={[styles.header, "on-surface-variant-text", "title-large"].join(' ')}>{j.name}</h1>
        <h2 className={[styles.header, "on-surface-variant-text", "title-large"].join(' ')}>{j.role}</h2>

        <List className='body-large'>
          {j.accomplishments.filter(l => l).map((l, i) => {
            return <>
              <ListItem className={styles.listItem} key={i}>
                {l}
              </ListItem>
            </>

          })}
        </List>
      </div>
    </VerticalTimelineElement>
  )
}

function byStartDate(a: Job, b: Job) {
  let aStart = new Date("1/" + a.startDate);
  let bStart = new Date("1/" + b.startDate)

  return bStart.getTime() - aStart.getTime()
}

const Timeline = ({ jobs }: TimelineProps) => {

  if (jobs.length == 0) {
    return null
  }

  const data = jobs.sort(byStartDate).map(toTimelineElement)

  return (
    <VerticalTimeline
      className={[styles.timeline, "on-background-text"].join(' ')}
    >
      {data}
    </VerticalTimeline>
  )
}

export default Timeline;
