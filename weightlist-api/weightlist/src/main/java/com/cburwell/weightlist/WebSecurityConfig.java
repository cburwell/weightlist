package com.cburwell.weightlist;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

@Configuration
//@EnableWebSecurity
public class WebSecurityConfig { //extends WebSecurityConfiguration {
    @Bean
    SecurityFilterChain web(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/", "/home", "/login", "/signup").permitAll()
                        .requestMatchers("/exercises", "/tags", "/workouts", "/logout").authenticated()
                        .anyRequest().authenticated()
                );
//                .formLogin((form) -> form
//                        .successHandler(mfaAuthenticationHandler)
//                        .failureHandler(mfaAuthenticationHandler)
//                )
//                .exceptionHandling((exceptions) -> exceptions
//                        .withObjectPostProcessor(new ObjectPostProcessor<ExceptionTranslationFilter>() {
//                            @Override
//                            public <O extends ExceptionTranslationFilter> O postProcess(O filter) {
//                                filter.setAuthenticationTrustResolver(new MfaTrustResolver());
//                                return filter;
//                            }
//                        })
//                );
        // @formatter:on
        return http.build();
    }

    // for the second-factor
    @Bean
    AesBytesEncryptor encryptor() throws Exception {
        KeyGenerator generator = KeyGenerator.getInstance("AES");
        generator.init(128);
        SecretKey key = generator.generateKey();
        return new AesBytesEncryptor(key, KeyGenerators.secureRandom(12), AesBytesEncryptor.CipherAlgorithm.GCM);
    }

    // for the third-factor
    @Bean
    PasswordEncoder encoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    AuthenticationSuccessHandler successHandler() {
        return new SavedRequestAwareAuthenticationSuccessHandler();
    }

    @Bean
    AuthenticationFailureHandler failureHandler() {
        return new SimpleUrlAuthenticationFailureHandler("/login?error");
    }
    //    Set up basic in-memory auth
//    @Autowired
//    public void configure(AuthenticationManagerBuilder auth)
//            throws Exception {
//        auth.inMemoryAuthentication().withUser("user")
//                .password(passwordEncoder().encode("password")).roles("USER");
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    //    Enable HTTP security
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(auth -> {
//                            auth.requestMatchers("/", "/home", "/login", "/signup").permitAll();
//                            auth.requestMatchers("/exercises", "/tags", "/workouts", "/logout").authenticated();
//                        }
//                )
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
////                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
////                .httpBasic(Customizer.withDefaults())
//        return http.build();
//    }
}
