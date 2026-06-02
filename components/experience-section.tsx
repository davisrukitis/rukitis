"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { experience, education } from "@/lib/data"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-16 lg:py-24 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Experience */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground mb-6 md:mb-8"
            >
              Experience
            </motion.p>

            <div className="space-y-6 md:space-y-8">
              {experience.map((company, companyIndex) => (
                <motion.div
                  key={companyIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: companyIndex * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex gap-3 sm:gap-4 md:gap-5">
                    {/* Logo and Timeline Column */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: "40px" }}>
                      {/* Company Logo */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f5f5f7] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm rounded-full relative z-10">
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.company}
                          width={48}
                          height={48}
                          className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        />
                      </div>

                      {/* Timeline */}
                      {company.roles.length > 1 && (
                        <div className="relative flex-1 flex flex-col items-center w-full mt-2">
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(to bottom, #d4d4d4 0px, #d4d4d4 4px, transparent 4px, transparent 8px)",
                            }}
                          />
                          <div className="flex flex-col justify-between h-full py-2 relative z-10">
                            {company.roles.map((_, roleIndex) => (
                              <div
                                key={roleIndex}
                                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white border-2 border-neutral-300"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm md:text-base">{company.company}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4">{company.totalPeriod}</p>

                      <div
                        className={
                          company.roles.length > 1 ? "flex flex-col justify-between" : "space-y-3 md:space-y-4"
                        }
                        style={company.roles.length > 1 ? { minHeight: `${company.roles.length * 40}px` } : {}}
                      >
                        {company.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="py-0.5 md:py-1">
                            <h3 className="font-medium text-xs md:text-sm">{role.title}</h3>
                            <p className="text-[10px] md:text-xs text-muted-foreground">
                              {role.period} · {role.type}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground mb-6 md:mb-8"
            >
              Education
            </motion.p>

            <div className="space-y-4 md:space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-3 md:gap-4"
                >
                  {item.isDoubleDegree && item.schools ? (
                    <div className="relative w-10 md:w-12 h-16 md:h-20 flex-shrink-0">
                      <div className="absolute top-0 left-0 w-9 h-9 md:w-11 md:h-11 bg-[#f5f5f7] flex items-center justify-center overflow-hidden border-2 border-white z-10 shadow-sm rounded-full">
                        <Image
                          src={item.schools[0].logo || "/placeholder.svg"}
                          alt={item.schools[0].name}
                          width={44}
                          height={44}
                          className="w-5 h-5 md:w-7 md:h-7 object-contain"
                        />
                      </div>
                      <div className="absolute top-7 md:top-9 left-0 w-9 h-9 md:w-11 md:h-11 bg-[#f5f5f7] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm rounded-full">
                        <Image
                          src={item.schools[1].logo || "/placeholder.svg"}
                          alt={item.schools[1].name}
                          width={44}
                          height={44}
                          className="w-5 h-5 md:w-7 md:h-7 object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f5f5f7] flex items-center justify-center flex-shrink-0 overflow-hidden border-white border-2 shadow-sm rounded-full">
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.school}
                        width={48}
                        height={48}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    {item.period && (
                      <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">{item.period}</p>
                    )}
                    <h3 className="text-sm md:text-base font-medium">{item.degree}</h3>
                    {item.isDoubleDegree && item.schools ? (
                      <div className="flex flex-col gap-0.5 mt-1">
                        {item.schools.map((school, schoolIndex) => (
                          <p key={schoolIndex} className="text-xs md:text-sm text-muted-foreground">
                            {school.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm text-muted-foreground">{item.school}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
