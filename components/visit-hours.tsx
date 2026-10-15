"use client";

import { useSyncExternalStore } from "react";
import {
  validVisitDay,
  visitDays,
  visitHoursStatus,
  visitTime,
  type VisitWeek,
} from "@/lib/visit";

const subscribe = (listener: () => void) => {
  const timer = window.setInterval(listener, 60000);
  return () => window.clearInterval(timer);
};
const getMinute = () => Math.floor(Date.now() / 60000);
const getServerMinute = () => null;

export function VisitHours({ hours }: { hours: VisitWeek }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const status =
    minute === null ? null : visitHoursStatus(hours, new Date(minute * 60000));
  return (
    <div className="visit-hours">
      <p className="care-kicker">Consultation hours</p>
      {status?.text && (
        <p className="visit-hours-status" data-open={status.open}>
          {status.text}
        </p>
      )}
      <dl className="visit-days">
        {hours.map((day, index) => (
          <div
            key={visitDays[index]}
            data-today={status?.today === index || undefined}
          >
            <dt>{visitDays[index]}</dt>
            <dd>
              {day === "closed" ? (
                "Closed"
              ) : validVisitDay(day) ? (
                <>
                  <span>{visitTime(day.open)}</span>
                  <span>to {visitTime(day.close)}</span>
                </>
              ) : (
                <span aria-label="Hours being confirmed">-</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
