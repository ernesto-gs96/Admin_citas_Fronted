import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NextAppointmentCard } from "@/components/dashboard/next-appointment-card";
import { AppointmentTimeline } from "@/components/dashboard/appointment-timeline";
import { AppointmentListCard } from "@/components/dashboard/appointment-list-card";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import { BookingLinkCard } from "@/components/dashboard/booking-link-card";
import { TimelineFilters } from "@/components/dashboard/timeline-filters";
import {
  bookingLink,
  currentTimeLabel,
  todayAppointments,
  todaySchedule,
  upcomingAppointments,
} from "@/lib/mock/dashboard";
import { CalendarIcon } from "@/components/dashboard/dashboard-icons";

export default function DashboardPage() {
  const pendingToday = todayAppointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;
  const availableToday = todaySchedule.filter(
    (slot) => slot.kind === "free",
  ).length;
  const nextAppointment = todayAppointments[0] ?? null;

  const todayLabel = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const capitalizedTodayLabel =
    todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1);

  return (
    <>
      <DashboardHeader
        totalToday={todayAppointments.length}
        nextTime={nextAppointment?.time}
      />

      <section className="grid grid-cols-4 gap-4 mb-3">
        <div className="card-dashboard-panel">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Citas de hoy</h2>
            <span className="card-dashboard-panel-icon" aria-hidden="true">
              <CalendarIcon />
            </span>
          </div>

          <h3>{todayAppointments.length}</h3>
        </div>
      </section>

      <NextAppointmentCard
        next={nextAppointment}
        totalToday={todayAppointments.length}
        pending={pendingToday}
        available={availableToday}
        currentTimeLabel={currentTimeLabel}
      />

      <div className="dashboard-columns">
        <div className="dashboard-column-main">
          <section className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Línea de tiempo de hoy</h2>
              <TimelineFilters dateLabel={capitalizedTodayLabel} />
            </div>
            <AppointmentTimeline
              schedule={todaySchedule}
              currentTimeLabel={currentTimeLabel}
            />
          </section>

          <section className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Próximas citas de la semana</h2>
              <Link href="/dashboard/citas" className="text-link">
                Ver toda la agenda →
              </Link>
            </div>
            <AppointmentListCard appointments={upcomingAppointments} />
          </section>
        </div>

        <div className="dashboard-column-side">
          <MiniCalendar appointmentsToday={todayAppointments.length} />
          <BookingLinkCard link={bookingLink} />
        </div>
      </div>
    </>
  );
}
